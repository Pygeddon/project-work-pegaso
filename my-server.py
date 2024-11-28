from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from fpdf import FPDF

import urllib.parse

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'GET Request Data', 0, 1, 'C')

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

    def chapter_title(self, title):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, title, 0, 1, 'L')
        self.ln(10)
        
    def chapter_body(self, body):
        self.set_font('Arial', '', 12)
        self.multi_cell(0, 10, body)
        self.ln()


class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        query_params = urllib.parse.parse_qs(parsed_path.query)
        
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        response = f"Received GET request with parameters: {json.dumps(query_params)}"
        self.wfile.write(response.encode('utf-8'))
        # Create a PDF with the received data
        pdf = PDF()
        pdf.add_page()
        pdf.chapter_title('Ecco il Biglietto per l''evento prenotato!')
        pdf.chapter_body(json.dumps(query_params, indent=4))

        pdf_output_path = '/home/robsansterre/Documenti/MyCode/MyCode/project-work-pegaso/tickets/request_data.pdf'
        pdf.output(pdf_output_path)

        print(f"\nPDF created at: {pdf_output_path}")


def run(server_class=HTTPServer, handler_class=MyServer, port=4000):
    server_address = ('localhost', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()