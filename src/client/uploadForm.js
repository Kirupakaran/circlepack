import React from "react";

class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            msg: ''
        };
        this.upload = this.upload.bind(this);
    }
  
    upload() {
        const formData = new FormData();
        formData.append('file', this.state.file);
        fetch(this.props.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            this.setState({msg: 'Uploaded successfully'});
        })
        .catch(err => {
            console.error(err);
            this.setState({msg: 'Failed to upload file'});
        });
    }
  
    render() {
        return (
            <div>
                <input type='file' name='file' onChange={e => this.setState({file: e.target.files[0]}) }/>
                <button onClick={this.upload}>Upload</button>
                <span> { this.state.msg } </span>
            </div>
        );
    }
}

export default UploadForm;