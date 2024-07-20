package VTIFOOD.VTI_Food.DTO;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data//toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public class BaseDTO implements Serializable {

    @CreationTimestamp
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd hh:mma")
    private LocalDateTime createdAt;


    @Column(name = "updated_at", nullable = false, insertable = false)
    @UpdateTimestamp
    @LastModifiedDate
    @JsonFormat(pattern = "yyyy-MM-dd hh:mma")
    private LocalDateTime updatedAt;
}
