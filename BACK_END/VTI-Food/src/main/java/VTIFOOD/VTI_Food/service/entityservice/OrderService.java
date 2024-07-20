package VTIFOOD.VTI_Food.service.entityservice;

import VTIFOOD.VTI_Food.form.OrderCreateForm;

public interface OrderService {
    void createOrderFromCart(OrderCreateForm form);
}
