package tech.getarrays.filestorage.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.filestorage.model.File;

import java.util.List;
import java.util.Optional;

public interface FileRepo extends JpaRepository<File,Long> {
    Optional<File> findByFileName(String fileName);
    void deleteByFileName(String fileName);
}
