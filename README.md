# microservice

- Kiến trúc monolith : Hiểu đơn chúng ta chỉ có 1 server để cung cấp các feature cho ứng dụng, sẽ chỉ có một routing, middeware, bussiness logic, database access.
- Kiến trúc microservice: Với mỗi feature của ứng dụng thì chúng ta triển khai riêng cho nó một service nhỏ bao gồm (Routing, Middleware,, Bussiess Logic, Database access), mỗi server sẽ có hàng trăm service (mỗi servide sẽ phụ trách từng feature riêng biệt) nhỏ mỗi serive này có middleware, router, controller, database riêng.
  => Với kiến trúc monolith chúng ta có tất cả code để triển khai ứng dụng còn với kiến trúc microservice thì chúng ta tách biệt nó ra từng service liên tục.

============================

- Vấn đề chính của microservice đó là việc quản lý data giữa các service (Data management between service) đây là vấn đề chính khi triển khai ứng dụng trên mô hình này, mỗi service thường sẽ có duy nhất một database (có thể không có hoặc nhiều hơn 1),
  => Điều chúng ta cần nhớ rằng với mô hình microservice thì server này không được phép truy cập database của service khác.
- Có 3 lý do cho điều này

* Nếu chúng ta triển khai mỗi service có 1 Database riêng sẽ dễ dàng Scalling hơn
* Nếu 1 service được quyền truy cập database của service khác nếu database bị crash thì cả 2 service sẽ bị ngỏm.
* Trong một dự án lớn với mỗi service sẽ có 1 team quản lý service đó, với mỗi sự thay đổi nào về schema trong database sẽ ảnh hưởng đến các service cùng truy cập vào nó.
* Với mỗi service chúng ta có một yêu cầu về nghiệp vụ riêng do đó nó cũng cần một loại DB riêng có thể service này cần sql có thể servie khác cần nosql.

- Làm thế nào để các service có thể giao tiếp được với nhau mà chúng không được quyền truy cập database khác ?
  => Có 2 cách đó là Sync và Async:

* Sync: Các service giao tiếp với nhau bằng cách gửi các request trực tiếp đến service nó cần data, Hiểu đơn giản nếu một service A cần data ở 3 service B C D thì A chỉ cần gửi request đế 3 service này

- Ưu điểm:

* Dễ dàng triển khai, mô hình dễ hiểu.
* A không cần acccess vào database của B C D

- Nhược

* A lúc này sẽ phụ thuộc vào các service còn lại, nếu một trong các quá trình xử lý ở B C D fail thì request đến A sẽ fail
* Hiệu năng không cao do chúng ta không biết được B C D liệu có giao tiếp với các service khác để lấy dữ liệu không ? quá trình lấy các dữ liệu cần thiết có thể đi qua rất nhiều service => điều này dĩ nhiên tăng thời gian chờ của user.
* Liên quan đến lý do thứ 2 rằng chúng ta không biết để lấy được dữ liệu cần thiết thì phải đi qua bao nhiêu service, điều này dần đến rất khó để debug và maintain.

- Async: Các service giao tiếp với nhau bằng các sự kiện (events), các service sẽ không giao tiếp trực tiếp với nhau mà sẽ thông qua một thứ là Event bus.
  => Giả sử Service A cần data từ Service B, A sẽ bắn một event vào EventBus (với title và payload được thống nhất từ trước), EventBus sẽ gửi request này đến B và B sẽ gửi lại data cho EventBus, lúc này EventBus sẽ trả lại data cho A.
  Mô hình này cũng có thể mở rộng không chỉ có read mà có cả write, bất kì sự thay đổi nào trong db của 1 service có thể được thông báo đến các service khác thông qua EventBus.

* Ưu điểm:

- Các service sẽ không phụ thuộc vào nhau, sẽ chỉ tương tác với database của nó mà thôi.
- Nhanh do không phụ thuộc vào service nào.

* Nhược điểm:

- Trùng lặp dữ liệu là điều không thể tránh khỏi.
- Khó hiểu và cũng khó để triển khai hoàn hảo.

==========================================================

- EventBus

* Có nhiều cách để triển khai EventBus RabbitMQ, Kafka, NATS...
* Mục đích chính của EventBus đó chính là receives một event và publishes cho những listeners.
