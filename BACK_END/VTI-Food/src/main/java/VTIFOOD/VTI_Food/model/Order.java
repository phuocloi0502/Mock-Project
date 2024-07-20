package VTIFOOD.VTI_Food.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "`order`")
public class Order extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(name = "delivery_date", nullable = false)
    @CreationTimestamp
    @JsonIgnore
    private LocalDateTime deliveryDate;

    @Column(name = "delivery_address", length = 255, nullable = false)
    private String deliveryAddress;

    @Convert(converter = OrderStatusConverter.class)
    @Column(name = "order_status", nullable = false)
    private OrderStatus orderStatus;

    @Column(name = "note", length = 255)
    private String note;

    @Column(name = "payment_status", nullable = false)
    private Boolean paymentStatus;

    @Column(name = "payment_date")
    @CreationTimestamp
    @JsonIgnore
    private LocalDateTime paymentDate;

    @ManyToOne
    @JoinColumn(name = "payment_method_id", referencedColumnName = "id", nullable = false)
    private PaymentMethod paymentMethod;

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    public enum OrderStatus {
        XAC_NHAN("XÁC NHẬN"),
        DONG_GOI("ĐÓNG GÓI"),
        DANG_GIAO("ĐANG GIAO"),
        DA_NHAN("ĐÃ NHẬN"),
        DA_HUY("HỦY");

        private final String value;

        OrderStatus(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public static OrderStatus fromValue(String value) {
            for (OrderStatus status : OrderStatus.values()) {
                if (status.value.equals(value)) {
                    return status;
                }
            }
            throw new IllegalArgumentException("Cập nhật sai trạng thái: " + value);
        }
    }

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails;
}
