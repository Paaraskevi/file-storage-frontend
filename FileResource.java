package tech.getarrays.filestorage;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.getarrays.filestorage.model.File;
import tech.getarrays.filestorage.service.FileService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/file")
public class FileResource {

    private final FileService fileService;

    public FileResource(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<File> uploadFile(@RequestParam("file") MultipartFile multipartFile) throws IOException {
        File file = new File();
        file.setFileName(multipartFile.getOriginalFilename());
        file.setFileType(multipartFile.getContentType());
        file.setFileSize(multipartFile.getSize());
        file.setUploadTime(LocalDateTime.now());

        File saved = fileService.uploadFile(file);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<File>> getAllFiles() {
        return new ResponseEntity<>(fileService.getAllFiles(), HttpStatus.OK);
    }

    @GetMapping("/{filename}")
    public ResponseEntity<File> getFileByFilename(@PathVariable("filename") String filename) {
        File file = fileService.findFileByFilename(filename);
        return new ResponseEntity<>(file, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable Long id) {
        fileService.deleteFile(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
