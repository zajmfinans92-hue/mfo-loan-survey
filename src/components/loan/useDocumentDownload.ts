export const useDocumentDownload = () => {
  const downloadDocument = (contentElement: HTMLElement, filename: string) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${filename}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
            h1 { font-size: 24px; margin-bottom: 20px; }
            h2 { font-size: 20px; margin-top: 30px; margin-bottom: 15px; }
            p { margin-bottom: 10px; }
            ul, ol { margin-left: 20px; margin-bottom: 10px; }
            li { margin-bottom: 5px; }
            section { margin-bottom: 25px; }
          </style>
        </head>
        <body>
          ${contentElement.innerHTML}
        </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const handleDownloadOferta = () => {
    const content = document.querySelector('#oferta-content');
    if (content) downloadDocument(content as HTMLElement, 'Договор_оферты.pdf');
  };

  const handleDownloadPrivacy = () => {
    const content = document.querySelector('#privacy-content');
    if (content) downloadDocument(content as HTMLElement, 'Политика_конфиденциальности.pdf');
  };

  const handleDownloadRefund = () => {
    const content = document.querySelector('#refund-content');
    if (content) downloadDocument(content as HTMLElement, 'Условия_возврата.pdf');
  };

  const handleDownloadContacts = () => {
    const content = document.querySelector('#contacts-content');
    if (content) downloadDocument(content as HTMLElement, 'Контакты.pdf');
  };

  return {
    handleDownloadOferta,
    handleDownloadPrivacy,
    handleDownloadRefund,
    handleDownloadContacts,
  };
};
