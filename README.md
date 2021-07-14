Buổi chia sẻ về Tổng quan kiến trúc Microservice
Đây là những phần kiến thức rất cơ bản góp nhặt được trong quá trình em làm việc với kiến trúc Microservice.
Đây là một chủ đề cực kì rộng bao gồm nhiều phần kiến thức nâng cao nên chắc chắn em sẽ có những thiếu sót
nên mọi người thoải mái gạch đá, cắt ngang và đặt câu hỏi, có thể em sẽ không trả lời được 
nhưng chắc chắn sẽ giúp em và mọi người tích lũy thêm kiến thức vào kinh nghiệm và có cái nhìn sâu sắc hơn về kiến trúc Microservice.



Phần 1: Hiểu lý do tại sao kiến trúc Microservice ra đời, so sánh kiến trúc Microservice với Monolithic
Phần 2: Các bước để thiết kế một ứng dụng theo mô hình Microservice
Phần 3: Cùng thiết kế một ứng dụng theo mô hình Microservice đơn giản
Phần 4: Một số vấn đề phổ biến khi thiết kế ứng dụng theo mô hình Microservice




Kiến trúc monolith :
Kiến trúc Mono là cha đẻ của tất cả các loại kiến trúc, ngày nay vẫn có rất nhiều ứng dụng được xây dựng theo kiến trúc Mono và đó cũng không hẳn là điều xấu vì có rất nhiều kịch bản phù hợp với loại kiến trúc này.
Với kiến trúc Mono thì toàn bộ ứng dụng là một khối lớn, trong khối lớn ấy chia thành các modun nhỏ tất cả các thành phần trong ứng dụng được thực thi trong một process duy nhất,
Không có sự phân tán nào, hiểu đơn giản là các service của ứng dụng đều chạy trên cùng một server
Các service có liên kêt rất chặt chẽ với nhau, các service không cần phải sử dụng api hay queue để gọi sang nhau.
Các ứng dụng thiết kế theo mô hình Mono cực kì hạn chế việc chia sẻ dữ liệu với một ứng dụng bên thứ 3 Example:
Lấy ví dụ là một ứng dụng đơn giản thiết kế theo mô hình Mono => có thể hiểu đơn giản nó chỉ là một Proccess, 
Process này bao gồm tất cả các thành phần của ứng dụng.
Ưu điểm:
Thiết kế đơn giản (Không cần phải handle network, không cần message queue, không quan tâm đến tuần tự hóa)
Performance nhìn chung sẽ tốt hơn Micro do không cần phải triển khai queue, networking, các service có thể gọi nhau trực tiếp một cách rất dễ dàng.
Hạn chế:
Với Mô hình Mono ứng dụng sẽ được xây dựng trên một nền tảng duy nhất, rất khó để các thành phầ khác nhau trong ứng dụng có thể được xây dựng bằng các nền tảng khác nhau. => Điều nay thì không phải lúc nào cũng phù hợp với nghiệp vụ.

Không thể lựa chọn nền tảng để phát triển cho mỗi thành phần trong ứng dụng.

Toàn bộ codebase sẽ được triển khai lại từ đầu => Tốn kém về mặt thời gian, hiệu năng. => Chạy lại toàn bộ unit test

Với ứng dụng theo kiến trúc Mono, tài nguyên máy tình như CPU hay RAM được chia sẻ đều cho mọi thành phần, rất khó để phân phối tài nguyên nhiều hơn hay ít hơn chỗ mỗi thành phần, điều này là hạn chế do khả năng tiêu thụ tài nguyên của thành phần trong ứng dụng là khác nhau, rất khó để phân bổ tài nguyên CPU hay RAM cho một thành phần cụ thể trong ứng dụng.

Duy trì một lượng codebase lớn và phức tạp tăng dần theo thời gian, điều này dẫn đến việc => Mọi thay đổi dù là nhỏ nhất cũng có thể ảnh hưởng đến toàn bộ hệ thống => Testing rất khó do lượng code base là cực kì lớn, các service đều có liên kết chặt chẽ với nhau => Dẫn đến việc rất khó để maintain, dễ đến việc hệ thống rất dễ bị lỗi thời.

Dẫn tới sự ra đời của kiến trúc Microservice
Đặc điểm
Mỗi thành phần của ứng dụng được chia thành các service độc lập
Mỗi service được chia tách dựa trên nghiệp vụ kinh doanh của ứng dụng. Hiểu đơn chúng ta chỉ có 1 server để cung cấp các feature cho ứng dụng, sẽ chỉ có một routing, middeware, bussiness logic, database access.
Ý tưởng cốt lõi:
Module hóa mọi thứ, nó hạn chế những tác động đến các service khác khi thay đổi code.
Các component cùng nhau tạo nên phần mềm/
=> Làm thế nào để phân chia ứng dụng thành các service cho hợp lý.

Dựa vào nghiệp vụ kinh doanh để phân chia.
Chúng ta sẽ xem xét chức năng tổng thể của hệ thống và vạch ra các khả năng kinh doanh khác nhau mà hệ thống có => Ví dụ : Một web thương mại điện tử có chức năng xem sản phẩm, đặt hàng, thanh toán, giao viện, kho bãi thì sẽ có những service độc lập phụ trách những nghiệp vụ đó.
Quản trị phi tập trung
Với mỗi project Mono sẽ có tiêu chuẩn cho tất cả mọi thứ.
Sử dụng ngôn ngữ lập trình nào ?
Sử dụng db nào
Sử dụng logging nào. => Cái này được gọi là quản trị tập trung. => Với quản trị phi tập trung: thì mỗi team chỉ chịu trách nhiệm toàn bộ cho service họ đang phát triển, mỗi team được toàn quyền lựa chọn cách thức để xây dựng service/
Kiến trúc microservice: Với mỗi feature của ứng dụng thì chúng ta triển khai riêng cho nó một service nhỏ bao gồm (Routing, Middleware,, Bussiess Logic, Database access), mỗi server sẽ có hàng trăm service (mỗi servide sẽ phụ trách từng feature riêng biệt) nhỏ mỗi serive này có middleware, router, controller, database riêng. => Với kiến trúc monolith chúng ta có tất cả code để triển khai ứng dụng còn với kiến trúc microservice thì chúng ta tách biệt nó ra từng service liên tục.
Quản trị dữ liệu phi tập trung: Mặc dù là phổ biến nhưng không phải tất cả service đều cần có một db riêng, điều này là không phải cần thiết trong mọi trường hợp.
Lợi ích của việc này là khuyến khích sự cô lập, điều này sẽ giảm thiểu tối đa việc các service phụ thuộc vào nhau, các service sẽ có nhiều quyền tự chủ về mặt dữ liệu, thay đổi dễ dàng và nhanh chóng hơn .

Vấn đề chính của microservice đó là việc quản lý data giữa các service (Data management between service) đây là vấn đề chính khi triển khai ứng dụng trên mô hình này, mỗi service thường sẽ có duy nhất một database (có thể không có hoặc nhiều hơn 1), => Điều chúng ta cần nhớ rằng với mô hình microservice thì server này không được phép truy cập database của service khác.

Có 3 lý do cho điều này

Một trong những nguyên tắc quan trọng nhất của mô hình Microservice đó là sự tự chủ về mặt dữ liệu của mỗi service, nói một cách đơn giản nếu chúng ta triển khai mỗi service có quản lý một database riêng sẽ dễ dàng scalling hơn, mỗi service có càng có quyền tự chủ về mặt dữ liệu của nó thì nó hoạt động càng độc lập, càng ít rằng buộc với các service khác
Nếu 1 service được quyền truy cập database của service khác nếu database bị crash thì cả 2 service sẽ bị ngỏm.
Trong một dự án lớn với mỗi service sẽ có 1 team quản lý service đó, với mỗi sự thay đổi nào về schema trong database sẽ ảnh hưởng đến các service cùng truy cập vào nó.
Với mỗi service chúng ta có một yêu cầu về nghiệp vụ riêng do đó nó cũng cần một loại DB riêng có thể service này cần sql có thể servie khác cần nosql.
Một đặc điểm dễ nhận biết nhất để biết chúng ta có thiết kế sai hay không đó là khi cần xử lý một request mà phải đi thu thập, tổng hợp dữ liệu ở rất nhiều service khác nhau điều đó cho thấy chúng ta đang thiết kế sai.
Làm thế nào để các service có thể giao tiếp được với nhau mà chúng không được quyền truy cập database khác ? => Có 2 cách đó là Sync và Async:
Sync: Các service giao tiếp với nhau bằng cách gửi các request trực tiếp đến service nó cần data, Hiểu đơn giản nếu một service A cần data ở 3 service B C D thì A chỉ cần gửi request đế 3 service này
Ưu điểm:
Dễ dàng triển khai, mô hình dễ hiểu.
A không cần acccess vào database của B C D
Dễ handle lỗi
Nhược
A lúc này sẽ phụ thuộc vào các service còn lại, nếu một trong các quá trình xử lý ở B C D fail thì request đến A sẽ fail
Hiệu năng không cao do chúng ta không biết được B C D liệu có giao tiếp với các service khác để lấy dữ liệu không ? quá trình lấy các dữ liệu cần thiết có thể đi qua rất nhiều service => điều này dĩ nhiên tăng thời gian chờ của user.
Liên quan đến lý do thứ 2 rằng chúng ta không biết để lấy được dữ liệu cần thiết thì phải đi qua bao nhiêu service, điều này dần đến rất khó để debug và maintain.
Async: Các service giao tiếp với nhau bằng các sự kiện (events), các service sẽ không giao tiếp trực tiếp với nhau mà sẽ thông qua một thứ là Event bus. => Giả sử Service A cần data từ Service B, A sẽ bắn một event vào EventBus (với title và payload được thống nhất từ trước), EventBus sẽ gửi request này đến B và B sẽ gửi lại data cho EventBus, lúc này EventBus sẽ trả lại data cho A. Mô hình này cũng có thể mở rộng không chỉ có read mà có cả write, bất kì sự thay đổi nào trong db của 1 service có thể được thông báo đến các service khác thông qua EventBus.
Ưu điểm:
Các service sẽ không phụ thuộc vào nhau, sẽ chỉ tương tác với database của nó mà thôi.
Nhanh do không phụ thuộc vào service nào.
Nhược điểm:
Trùng lặp dữ liệu là điều không thể tránh khỏi.
Khó hiểu và cũng khó để triển khai hoàn hảo.
==========================================================

EventBus
Có nhiều cách để triển khai EventBus RabbitMQ, Kafka, NATS...
Mục đích chính của EventBus đó chính là receives một event và publishes cho những listeners.
Ứng dụng nhỏ, không phức tạp => nên thiết kế theo mô hình monolith
Một ứng dụng khi thiết kế chỉ có từ 2 - 3 component thì mô hình Microservice có lẽ không phải là sự lựa chọn đúng đắn.
Hệ thống yêu cầu hiệu suất cực cao,
Hệ thống không cần cập nhật.
































Thiêt kế ứng dụng theo mô hình Micro cần tuân theo theo một quy trình nhất định
Tuyệt đối không được đâm đầu vào phát triển luôn mà cần lên kế hoạch rõ ràng theo từng bước
vào thảo luận thật chi tiết.
=> Tuân theo triết lý "Plan more, code less"
Lập kế hoạch chi tiết rất quan trọng với việc thiết kế một hệ thống tốt, bạn càng lên kế hoạch
rõ ràng, chi tiết bạn càng có thể 
+ lường trước được khó khăn khi hệ thống phát triển ở quy mô lớn
+ điều quan trọng không phải là thêm cái gì mà có thể bớt được cái gì,
bạn viết code càng ít bạn càng giảm thiểu khả năng lỗi, dễ maintain phát triển dự án hơn.

* Mapping the Components
+ Là bước quan trọng nhất trong toàn bộ quá trình thiết kế.
+ Bước này sẽ xác định hệ thống sẽ có cấu trúc như thế nào ? các thành phần chính bao gồm những 
gì ?
+ Một khi đã làm xong bước này rất khó để thay đổi.

Vậy trong bước này chúng ta làm gì ?
=> Xác định các thành phần khác nhau của hệ thống, chúng ta cần thiết lập một cái nhìn tổng
quan về hệ thống, các phần sẽ làm việc cùng nhau như thế nào ?
VD: Trong một dự án TMĐT chúng ta sẽ xác định service nào sẽ xử lý order, service nào sẽ 
xử lý payment.

Vậy làm thế nào để xác định hệ thống cần có những thành phần nào ?
=> Chúng ta cần suy nghĩ theo những điều sau.
+ Nghiệp vụ kinh doanh
+ Quyền tự chủ về chức năng
+ Sẽ có những thực thể dữ liệu nào trong hệ thống
+ Quyền tự chủ về mặt dữ liệu.

* Nghiệp vụ kinh doanh (Business requirements) : 
- Khi phân chia service dựa trên nghiệp vụ kinh doanh chúng ta cần xem xét kĩ
NVKD của sản phẩm này sẽ yêu cầu những tính năng gì xung quanh nó.
VD: Quen thuộc nhất là một trang TMĐT có tính năng quản lý đơn hàng vậy yêu cầu xung quanh
nghiệp vụ đó là gì ?
+ Thêm, sửa, xóa, thống kê, xuất báo cáo, hoàn đơn....
Khi chúng ta ánh xạ thành phần của hệ thống chúng ta sẽ dựa vào vào NVKD làm khung cho 
thành phần đó, đây là nguyên tắc rất quan trọng khi muốn ánh xạ các thành phần của hệ thống
với NVKD của sản phẩm.

* Quyền tự chủ về mặt chức năng (Functional autonomy) .
- Đối với mỗi yêu cầu nghiệp vụ sẽ có một loạt các tính năng, khi ánh xạ các service của hệ thống
sang NVKD chúng ta cần phải cố găng thiết kế sao cho các yêu cầu có thể được phụ vụ bởi duy nhất 1 service
hạn chế tối đa một yêu cầu nhưng cần nhiều service để phục vụ => Đó chính là tự chủ về mặt chức năng.

VD: Lại lấy ví dụ là nghiệp vụ quản lý đơn hàng, giả sử có 2 yêu cầu.
+ Thống kế toàn bộ đơn hàng của tuần gần nhất (tự chủ)
+ Lấy toàn bộ đơn hàng được tạo bởi user có độ tuổi từ (34-45) (không tự chủ)
Tất nhiên trong thực tế rất rất khó để thiết kế service có các tính năng có thể tự chủ hoàn toàn
do vậy điều dễ dàng nhất để khắc phụ điều này đó là chuẩn bị cho việc nhân bản dữ liệu, trùng lặp hay phải
giao tiếp giữ các service, điều này là không thể tránh khỏi tất nhiên chúng ta phải thiết kế sao cho việc này
hạn chế hết mức có thể. 


* Xác định các thực thể dữ liệu của hệ thống (Data entities).
+ Chúng ta cần thiết kế service dựa trên những thực thể rõ ràng.
Giả sử: Một trang TMĐT sẽ có các thực thể như orders, product....
Một service được phân chia dựa trên thực thể của sản phẩm không nhất thiết chỉ tương tác với duy nhất 
thực thể đó mà chúng có thể có mối quan hệ với các thực thế khác, nhưng chỉ nên thiết lập = ID, service
không nên lưu trữ cả thực thể nó cần quan hệ.
VD: Order cần lưu trữ CustomerID.

* Quyền tự chủ về mặt dữ liệu (Data autonomy).
- Điều quan trọng nhất ở nguyên tắc này đó là mỗi service cần phải hạn chế tối đa việc phụ thuộc vào dữ liệu từ service khác để 
hoạt động bình thường (tất nhiên là trong những sản phẩm thực tế rất khó để thiết kế ứng dụng có để đáp ứng được yêu cầu này)

VD: Employees service cần dữ liệu của Address service để trả về thông tin đầy đủ của nhân viên.
Điều này thể hiện service Employeee đang bị phụ thuộc vào service Address cho thấy việc chúng ta thiết kế không
được tối ưu hóa, để khắc phục điều này cách giải quyết phổ biết đó là replicate trường address cho service Employee
tất nhiên nó chỉ là giải pháp phổ biến trong thực tế có rất nhiều case, chúng ta phải tùy cơ ứng biến.



VD về một hế thông TMĐT đơn giản.
Chúng ta sẽ chia hệ thống thành 4 service: 
+ Inventory(kho bãi)
+ Order (đơn hàng)
+ User (Khách hàng)
+ Payments (thanh toán)

Một số vấn đề trong thực tế phổ biến chúng ta sẽ gặp khi thiết kế ứng dụng theo kiểu Microservice.

Edge case #1:
Giả sử phát sinh một yêu cầu về nghiệp vụ đó là
- Lấy tất cả khách hàng ở NYC đi kèm với thông tin tổng số đơn hàng họ đã đặt.
Vậy chúng ta sẽ làm như thế nào ?
Sẽ có 3 cách tiếp cận.
+ Data Duplication: Tạo một bảng Order đồng bộ hóa dữ liệu với service Orders (gây trùng lặp dữ liệu, phải xử lý việc
đồng bộ hóa dữ liệu => nguy cơ sai khớp dữ liệu giữa 2 service)
+ Service Query: (Mỗi lần queery thì gọi sang Order => Tốn performance)
+ Aggregation Service: (Tạo một service thứ 3 để query dữ liệu đến 2 service Orders và Customers)

=> Cách giải quyết vấn đề phổ biến và đơn giản nhất sẽ là cách 1 tất nhiên trong thực tế với mỗi ứng dụng thì
sẽ có cách giải quyết riêng.

Edge case #2:
* Truy suất tất cả đơn hàng trong hệ thống.
=> Yêu cầu này sẽ có nguy cơ làm ngẽn hệ thống rất lớn do số lượng bản ghi có thể là cực kì lớn, lượng tải mà
hệ thống chịu sẽ là rất lớn.
=> Điều cần làm đầu tiên là tìm hiểu tại sao lại phát sinh yêu cầu về nghiệp vụ như thế này.
Nếu yêu cầu là bắt buộc thì trong trường hợp này chúng ta sẽ sử dụng Report Engine, với công cụ này
có thể trực tiếp làm việc với DB bỏ qua việc sử dụng API, với Report Engine thực hiện truy vấn hiệu quả hơn với CSDL.



* Cross-Cutting Services
- Là những service hoạt động trên toàn bộ hệ thống nói dễ hiểu nó là service cung cấp các tiện ích
để cho các service khác dùng, nó không bị rằng buộc bởi bất kì nghiệm vụ kinh doanh nào mà các service khác
sẽ được hưởng lợi từ việc sử dụng nó.
VD:
+ Logging
+ Caching
+ User management
- Với những cross-cutting-service chúng ta nên phát triển nó sớm để đưa nó vào trong dự án, điều này giúp đơn giản hóa
rất nhiều khi thiết kế các service khác.



Defining Communication Patterns (Xác định các loại hình giao tiếp giữa các service)
+ 1 to 1 sync
+ 1 to 1 async
+ Pub - sub Event Driven

* 1 to 1 async
- Service User gọi API trực tiếp vào service Order được gọi là Direct Connection tuy nhiên điều này không được khuyến khích.
Nếu chúng ta triển khai việc giao tiếp giữa các service bằng cách gọi Direct Connection sẽ có nhược điểm, hãy tưởng tượng bất cứ khi
nào thay đổi endpoint của một service chúng ta cần phải thay đổi lại toàn bộ các service khác trong hệ thống gọi đến endponint này.

Như vậy sẽ có 2 cách để giải quyết vấn đề này.

* Yellow Pages
- Sử dụng Yellow Pages (có thể hiểu đơn giản nó đóng vai trò như một danh bạ), Mỗi khi một service cần giao tiếp với service khác nó
sẽ gọi sang Yellow Pages để lấy Director URL, từ đó nó sử dụng Director URL để giao tiếp với service nó cần. 
- Yellow Pages nó sẽ là service duy nhất biết tất cả các Directory's URL.
- Chúng ta không nên tự xây dựng Yellow Pages mà sử dụng các dịch vụ của bên thứ 3 đã xây dựng sẵn, các dịch vụ này đã tích hợp sẵn
tính năng như logging, monitoring (Consul)

* API Gateway
- Trong cách giải quyết này chúng ta tạo ra một Gate way, service muốn giao tiếp đến các service khác sẽ gọi đến GATEWAY và GATEWAY
sẽ điều hướng request đến service mong muốn, gọi gián tiếp.

=> API GATEWAY sẽ là sự lựa chọn phổ biến hơn do với API GATEWAY chúng ta sẽ dễ dàng tích hợp các tính năng như authen, phân quyền, logging,
monitoring.


* 1 to 1 async
- Use case: Service order cần thông báo với service Payment để xử lý việc thanh toán cho đơn hàng, trong trường hợp này service Order
không cần phải đợi phản hồi từ service Payment, nếu service Payment đã xử lý xong chỉ cần bắn ngược lại message cho service Order


Nhược điểm: triển khai giao tiếp async cần nhiều bước hơn giao tiếp sync, thường chúng ta sẽ triển khai bằng các công cụ của bên thứ
3 như rabbitmq, hay kafka, Khó handle lỗi (không biết nó xảy ra ở đâu, lỗi khi xử lý messsage nào) 


* Pub - Sub/ Event Driven
- Khi có một message cần thông báo đồng thời cho nhiều service khác nhau, service bắn message sẽ không biết rõ ràng có bn service
sẽ nhận được message này.
- Nhược điểm (khó để triển khai, có thể gây quá tải cho hệ thống khi có quá nhiều service được nhận message trong cùng một lúc)

* Tổng kết:

- Cần phải lựa chọn cách thức giao tiếp giữa các service phù hợp với yêu cầu nghiệp vụ, điều này là cực kì quan trọng bởi vì nó sẽ
ảnh hưởng đến.
+ Performance
+ Error Handling
+ Flow (luồng giao tiếp giữa các service)
- Do khi đã thiết kế và đi vào quá trình xây dựng rất khó để thay đổi cách giao tiếp giữa các service.



* Selecting Techology Stack
- Tư tưởng Decentralized Governance cho phép chúng ta dễ dàng lựa chọng công nghệ để phát triển service mà không bị lệ thuộc 
vào các service khác

- Chọn SQL khi bạn có các thực thể dữ liệu có quan hệ rất chặt chẻ với nhau, thêm nữa SQL cũng hỗ trợ các truy vấn cực kì phức tạp
Cơ sở dữ liệu quan hệ rất mạnh ở 2 điểm này.
- Với No-SQL nó đề cao về quy mô và hiệu suất, mối liên hệ giữa các thực thể thường lỏng lẻo, dữ liệu thường lưu dưới dạng JSON





* Khi nào không nên áp dụng kiến trúc Microservice.

- Microservice không phải là giải pháp cho mọi kiến trúc phần mềm.
- Nếu thiết kế hệ thống sai có thể gây hậu quả rất lớn.

+ Các hệ thống nhỏ, có độ phức tạp thấp thường thiết kế theo kiến trúc Mono.
(Microservice sẽ gia tăng độ phức tạp khi thiết kế tất nhiên nó mang lại nhiều lợi ích và chúng ta phải cân đối 2 điều đó)

+ Trong trường hợp các thực thể dữ liệu của sản phẩm có mối liên hệ cực kì chặt chẽ với nhau.
=> Một trong các tư tưởng quan trọng nhất của Microserivce đó là khả năng tự chủ về mặt dữ liệu liện
=> Nếu không có cách nào chia các thực thể dữ liệu của sản phẩm, hoặc rất khó khăn để chia trong trường hợp này Microserice sẽ không phù hợp
=> Cách dễ nhất để nhận biết đó là khi có một yêu cầu mà cần truy suất dữ liệu từ rất nhiều
service thì đó là vấn đề cần cải thiện, trong trường hợp này chúng ta nên cố gắng thiết kế
lại các dịch vụ để chúng có thể tự chủ hơn.

+ Hệ thống yêu cầu cực kì cao về mặt hiệu suất do để giao tiếp giữa các serivce sẽ tốn chi phí về hiệu năng và thời gian đáng kể
=> Hệ thống quân sự, trò chơi...

+ Hệ thống không có nhu cầu cập nhật phần mềm theo thời gian.
=> Microservice giúp cập nhật ứng dụng nhannh hơn, chu kì cập nhật sản phẩm ngắn nên nếu sản phẩm không cần cập nhật thì không sử dụng
Mcirosercvice












Xây dựng một ứng dụng dụng theo mô hình Microservice đơn giản.


- Function Requirement (Phân tích yêu cầu nghiệp vụ của dự án)

- Non-Function Requiment (Phân tích các yêu cầu phi chức năng)

- Mapping Component (Dựa vào yêu cầu nghiệp vụ của dự án để chia các service)

- Define Communication (Xác định hình thức giao tiếp)

*  Giới thiệu dự án quản lý thư viện (MyLib)

Bao gồm các nghiệp vụ chính:

- Quản lý, kiểm kê sách, ghi chép số lượng các sách mới được thêm vào thư viện, thêm, sửa xóa.

- Quản lý việc mượn sách (theo dõi việc mượn sách của khách hàng, số ngày mượn, số lượng sách, sách nào, tình trạng, đặt cọc tiền sách là bao nhiêu..)

- Quản lý khách hàng (Số lượng khách hàng, tên tuổi, địa chỉ, số điện thoại..)

- Hệ thống gửi thông báo (Hiển thị thông báo - khi người dùng mượn sách, khi người dùng thanh toán, trả sách trễ, trả lại sách)

- Hệ thống tính phí (tính phí hàng năm, tính phí hàng tuần, hạng thành viên của người dùng, .. - Khuyến khích sử dụng nền tảng thanh
toán của bên thứ ba do xử lý việc thanh toán là công việc cực kì phức tạp và nhạy cảm, hạn chế tối đa việc xảy ra sai xót - khuyến nghị
dùng stripe
)


-  Bước đầu tiên chúng ta cùng phân tích function requirement và non-function requirement
+ Với function requirement chúng ta cần trả lời câu hỏi: Hệ thống phải làm gì ?
+ Với non-function requirement chúng ta cần trả lời câu hỏi: Hệ thống sẽ phải xử lý những gì ? traffic người dùng, lượng dữ liệu ước 
tính theo thời gian...

=> Thường khách hàng chỉ quan tâm đến các yêu cầu về mặt chức năng chứ không quan tâm những yêu cầu phi chức năng của hệ thống.

Chúng ta cần tự đặt một số câu hỏi quan trọng.

- Như ứng dụng gọi điện Signal mặc dù là một sản phẩm nghe gọi video đã có  có 50 triệu người dùng
những vẫn bị bị quá tải thậm chí sấp vì được Elon Musk kêu gọi mọi người dùng.

- Thiết kế hệ thống chịu tải cao là một chủ đề nâng cao cần có rất nhiều kiến thức và kinh nghiệm, em chưa đủ kiến thức nên không
trình bày chi tiết. 

- SLA có nghĩa là thời gian hoạt động cần thiết của hệ thống, nó cần phải hoạt động liên tục hay không ? thời gian downtime cho phép là bao nhiêu ?
SLA càng cao >95% thì hệ thống càng mạnh, càng tốn nhiều chi phí,  
VD: Hệ thống của AWS EC2 có SLA là 99% nếu SLA dưới 99% họ sẽ hoàn lại tiền.
=> Với hệ thống là thư viện chúng ta chỉ yêu cầu đơn giản hoạt động 9 tiếng/ngày và 5 ngày trong 1 tuần.
