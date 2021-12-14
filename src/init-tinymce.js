tinymce.init({
  selector: ".editor",
  height: "100%",
  resize: false,
  menubar: false,
  plugins: "save, print code",
  toolbar: "undo redo | styleselect | bold italic save print code",
  save_onsavecallback: function () {
    tinyMCE.execCommand("mceInsertContent", false, "Save not yet implemented.");
  },
  style_formats: [
    {
      title: "Headings",
      items: [
        { title: "Heading 1", format: "h1" },
        { title: "Heading 2", format: "h2" },
        { title: "Heading 3", format: "h3" },
        { title: "Heading 4", format: "h4" },
        { title: "Heading 5", format: "h5" },
        { title: "Heading 6", format: "h6" },
      ],
    },
    {
      title: "Inline",
      items: [
        { title: "Bold", format: "bold" },
        { title: "Italic", format: "italic" },
        { title: "Underline", format: "underline" },
        { title: "Strikethrough", format: "strikethrough" },
        { title: "Superscript", format: "superscript" },
        { title: "Subscript", format: "subscript" },
        { title: "Code", format: "code" },
      ],
    },
    {
      title: "Blocks",
      items: [
        { title: "Paragraph", format: "p" },
        { title: "Blockquote", format: "blockquote" },
        { title: "Div", format: "div" },
        { title: "Pre", format: "pre" },
      ],
    },
    {
      title: "Align",
      items: [
        { title: "Left", format: "alignleft" },
        { title: "Center", format: "aligncenter" },
        { title: "Right", format: "alignright" },
        { title: "Justify", format: "alignjustify" },
      ],
    },
    {
      title: "MUNE",
      items: [
        { title: "Oracle", block: "p", styles: { color: "#008060" } },
        { title: "Game", block: "p", styles: { color: "#800000" } },
      ],
    },
  ],
  content_css: "tinymce_styles.css",
});
