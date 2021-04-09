function copy({content, success, error}) {
    if (!document.queryCommandSupported('copy')) {
        error && error('Browser does not support');
    }
    let textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.readOnly = "readOnly";
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, content.length);
    let result = document.execCommand("copy");
    if(result) {
        success&&success("Copy successfully");
    } else {
        error&&error("Copy failed");
    }
    textarea.remove();
}

export default copy;

