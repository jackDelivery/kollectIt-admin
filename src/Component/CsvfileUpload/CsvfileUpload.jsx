import React from 'react';
import './CsvfileUpload.css'


export default function CsvfileUpload() {
    return (
        <div>
            <div class="file-upload">
                <button class="file-upload-btn" type="button" onclick="$('.file-upload-input').trigger( 'click' )">Add Excel</button>

                <div class="image-upload-wrap">
                    <form id="vts_form" enctype="multipart/form-data" method="post">
                        <input class="file-upload-input" name="input-file" type='file' onchange="readURL(this);" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                    </form>
                    <div class="drag-text">
                        <h3>Drag your excel or click<strong> ADD EXCEL</strong></h3>
                    </div>
                </div>
                <div class="file-upload-content">
                    <img class="file-upload-image" src="/assets/img/demo/excelIcon.png" alt="excel icon" />
                    <div class="image-title-wrap">
                        <button type="button" onclick="removeUpload()" class="remove-image">Remove <span class="image-title">Uploaded Excel</span></button>
                        <button type="button" class="upload-image">Upload <span class="image-title">Uploaded Excel</span></button>
                    </div>
                </div>
            </div>

        </div>
    )
}
