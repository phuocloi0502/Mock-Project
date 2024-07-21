package VTIFOOD.VTI_Food.service.serviceImpl;

import VTIFOOD.VTI_Food.DTO.OrderDetailDto;
import VTIFOOD.VTI_Food.mapper.OrderDetailMapper;
import VTIFOOD.VTI_Food.repository.OrderDetailRepository;
import VTIFOOD.VTI_Food.service.entityservice.OrderDetailService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderDetailServiceImpl implements OrderDetailService {
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public List<OrderDetailDto> getOrderDetailsByOrderId(Long orderId) {
        return orderDetailRepository.findByOrderId(orderId).stream()
                .map(OrderDetailMapper::map)
                .collect(Collectors.toList());
    }
}
