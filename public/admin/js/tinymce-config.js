tinymce.init({
  selector: 'textarea',
  height: 300,

  plugins: 'lists link image table code',
  license_key: 'gpl',

  menubar: false,

  toolbar:
    'bold italic underline | ' +
    'bullist numlist | ' +
    'link image table | ' +
    'removeformat code',

  content_style:
    'body { font-family: Arial, sans-serif; font-size: 14px }'
});
