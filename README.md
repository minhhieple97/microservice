# microservice

- Kiến trúc monolith :

* Kiến trúc Mono là cha đẻ của tất cả các loại kiến trúc, ngày nay vẫn có rất nhiều ứng dụng được xây dựng theo kiến trúc Mono và đó cũng không hẳn là điều xấu vì có rất nhiều kịch bản phù hợp với loại kiến trúc này.
* Với kiến trúc Mono thì toàn bộ ứng dụng là một khối lớn, trong khối lớn ấy chia thành các modun nhỏ tất cả các thành phần trong ứng dụng được thực thi trong một process duy nhất,
* Không có sự phân tán nào, hiểu đơn giản là các service của ứng dụng đều chạy trên cùng một server
* Các service có liên kêt rất chặt chẽ với nhau, các service không cần phải sử dụng api hay queue để gọi sang nhau.
* Các ứng dụng thiết kế theo mô hình Mono cực kì hạn chế việc chia sẻ dữ liệu với một ứng dụng bên thứ 3
  Example:

- Lấy ví dụ là một ứng dụng đơn giản thiết kế theo mô hình Mono => có thể hiểu đơn giản nó chỉ là một Proccess, Process này bao gồm tất cả các thành phần của ứng dụng.

* Ưu điểm:

- Thiết kế đơn giản (Không cần phải handle network, không cần message queue, không quan tâm đến tuần tự hóa)
- Performance nhìn chung sẽ tốt hơn Micro do không cần phải triển khai queue, networking, các service có thể gọi nhau trực tiếp một cách rất dễ dàng.

* Hạn chế:

- Với Mô hình Mono ứng dụng sẽ được xây dựng trên một nền tảng duy nhất, rất khó để các thành phầ khác nhau trong ứng dụng có thể được xây dựng bằng các nền tảng khác nhau.
  => Điều nay thì không phải lúc nào cũng phù hợp với nghiệp vụ.
- Không thể lựa chọn nền tảng để phát triển cho mỗi thành phần trong ứng dụng.

- Toàn bộ codebase sẽ được triển khai lại từ đầu
  => Tốn kém về mặt thời gian, hiệu năng.
  => Chạy lại toàn bộ unit test

- Với ứng dụng theo kiến trúc Mono, tài nguyên máy tình như CPU hay RAM được chia sẻ đều cho mọi thành phần, rất khó để phân phối tài nguyên nhiều hơn hay ít hơn chỗ mỗi thành phần, điều này là hạn chế do khả năng tiêu thụ tài nguyên của thành phần trong ứng dụng là khác nhau, rất khó để phân bổ tài nguyên CPU hay RAM cho một thành phần cụ thể trong ứng dụng.

- Duy trì một lượng codebase lớn và phức tạp tăng dần theo thời gian, điều này dẫn đến việc
  => Mọi thay đổi dù là nhỏ nhất cũng có thể ảnh hưởng đến toàn bộ hệ thống
  => Testing rất khó do lượng code base là cực kì lớn, các service đều có liên kết chặt chẽ với nhau
  => Dẫn đến việc rất khó để maintain, dễ đến việc hệ thống rất dễ bị lỗi thời.

* Dẫn tới sự ra đời của kiến trúc Microservice

- Đặc điểm

* Mỗi thành phần của ứng dụng được chia thành các service độc lập
* Mỗi service được chia tách dựa trên nghiệp vụ kinh doanh của ứng dụng.
  Hiểu đơn chúng ta chỉ có 1 server để cung cấp các feature cho ứng dụng, sẽ chỉ có một routing, middeware, bussiness logic, database access.

- Ý tưởng cốt lõi:

* Module hóa mọi thứ, nó hạn chế những tác động đến các service khác khi thay đổi code.
* Các component cùng nhau tạo nên phần mềm/

=> Làm thế nào để phân chia ứng dụng thành các service cho hợp lý.

- Dựa vào nghiệp vụ kinh doanh để phân chia.
- Chúng ta sẽ xem xét chức năng tổng thể của hệ thống và vạch ra các khả năng kinh doanh khác nhau mà hệ thống có
  => Ví dụ : Một web thương mại điện tử có chức năng xem sản phẩm, đặt hàng, thanh toán, giao viện, kho bãi thì sẽ có những service độc lập phụ trách những nghiệp vụ đó.

* Quản trị phi tập trung

- Với mỗi project Mono sẽ có tiêu chuẩn cho tất cả mọi thứ.

* Sử dụng ngôn ngữ lập trình nào ?
* Sử dụng db nào
* Sử dụng logging nào.
  => Cái này được gọi là quản trị tập trung.
  => Với quản trị phi tập trung: thì mỗi team chỉ chịu trách nhiệm toàn bộ cho service họ đang phát triển, mỗi team được toàn quyền lựa chọn cách thức để xây dựng service/

- Kiến trúc microservice: Với mỗi feature của ứng dụng thì chúng ta triển khai riêng cho nó một service nhỏ bao gồm (Routing, Middleware,, Bussiess Logic, Database access), mỗi server sẽ có hàng trăm service (mỗi servide sẽ phụ trách từng feature riêng biệt) nhỏ mỗi serive này có middleware, router, controller, database riêng.
  => Với kiến trúc monolith chúng ta có tất cả code để triển khai ứng dụng còn với kiến trúc microservice thì chúng ta tách biệt nó ra từng service liên tục.

* Quản trị dữ liệu phi tập trung: Mặc dù là phổ biến nhưng không phải tất cả service đều cần có một db riêng, điều này là không phải cần thiết trong mọi trường hợp.
- Lợi ích của việc này là khuyến khích sự cô lập, điều này sẽ giảm thiểu tối đa việc các service phụ thuộc vào nhau, các service sẽ có nhiều quyền tự chủ về mặt dữ liệu, thay đổi dễ dàng và nhanh chóng hơn . 

- Vấn đề chính của microservice đó là việc quản lý data giữa các service (Data management between service) đây là vấn đề chính khi triển khai ứng dụng trên mô hình này, mỗi service thường sẽ có duy nhất một database (có thể không có hoặc nhiều hơn 1),
  => Điều chúng ta cần nhớ rằng với mô hình microservice thì server này không được phép truy cập database của service khác.
- Có 3 lý do cho điều này

* Một trong những nguyên tắc quan trọng nhất của mô hình Microservice đó là sự tự chủ về mặt dữ liệu của mỗi service, nói một cách đơn giản nếu chúng ta triển khai mỗi service có quản lý một database riêng sẽ dễ dàng scalling hơn, mỗi service có càng có quyền tự chủ về mặt dữ liệu của nó thì nó hoạt động càng độc lập, càng ít rằng buộc với các service khác
* Nếu 1 service được quyền truy cập database của service khác nếu database bị crash thì cả 2 service sẽ bị ngỏm.
* Trong một dự án lớn với mỗi service sẽ có 1 team quản lý service đó, với mỗi sự thay đổi nào về schema trong database sẽ ảnh hưởng đến các service cùng truy cập vào nó.
* Với mỗi service chúng ta có một yêu cầu về nghiệp vụ riêng do đó nó cũng cần một loại DB riêng có thể service này cần sql có thể servie khác cần nosql.
* Một đặc điểm dễ nhận biết nhất để biết chúng ta có thiết kế sai hay không đó là khi cần xử lý một request mà phải đi thu thập, tổng hợp dữ liệu ở rất nhiều service khác nhau điều đó cho thấy chúng ta đang thiết kế sai.

- Làm thế nào để các service có thể giao tiếp được với nhau mà chúng không được quyền truy cập database khác ?
  => Có 2 cách đó là Sync và Async:

* Sync: Các service giao tiếp với nhau bằng cách gửi các request trực tiếp đến service nó cần data, Hiểu đơn giản nếu một service A cần data ở 3 service B C D thì A chỉ cần gửi request đế 3 service này

- Ưu điểm:

* Dễ dàng triển khai, mô hình dễ hiểu.
* A không cần acccess vào database của B C D
* Dễ handle lỗi

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

<!-- Vấn đề Logging và Monitoring giữa trong Microservice  -->

<!-- Trong trường hợp nào không nên thiết kế theo mô hình Microservice -->

- Ứng dụng nhỏ, không phức tạp => nên thiết kế theo mô hình monolith
- Một ứng dụng khi thiết kế chỉ có từ 2 - 3 component thì mô hình Microservice có lẽ không phải là sự lựa chọn đúng đắn.
- Hệ thống yêu cầu hiệu suất cực cao,
- Hệ thống không cần cập nhật.
