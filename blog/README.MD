case 1: Dựng moderation service để kiểm duyệt thông báo sau đó tạo event để communicate với comment service và query service,
case 3: Query service chỉ listen sự kiện từ comment serice, phần kiểm duyệt sẽ do moderation service đảm nhận và communicate với comment service.

Kubernetes = Popular Container Orchestration
=> Container Orchestration : là trình điều phối container tốt nhất hiện nay hiểu đơn giản nó sẽ lấy các container mà bạn muốn nó chạy và nó sẽ sử dụng một loạt các server(node) rồi quyết định cách chạy các container trong các node của nó, nó cung cấp một loại các api để deploy, maintain, scale.
Hiểu đơn giản Kubernetes là một tập hợp các api sẽ chạy trên các app trong container để quản lý một nhóm các server và sau đó thực thi container trên Docker (theo mặc định nó có thể chạy trên Docker nhưng nó cũng có thể chạy các loại container khác.)
=> Sử dụng K8s có rất nhiều lợi ích:

- Tự động hóa sự thay đổi và giám sát trạng thái của mọi container.

Kubectl: là CLI mà chúng ta sẽ dùng để giao tiếp với K8s
Node: được coi là một server trong K8s cluster (trên local thì chúng ta sẽ dùng minikube để chạy các node)
Kubelet: chạy trên mỗi node, giúp các node và cluster của k8s có thể giao tiếp được với nhau.
Control Plane: hiểu đơn giản nó chính là master của k8s, nó sẽ bao gồm API Server, Scheduler, Controller Manager
Kube-proxy: chạy trong Node, nó sẽ kiểm soát mạng trong Node.

- Các Object trong Kubernetes

* Service : là object giúp các pods giao tiếp với nhau (nhà cung cấp mạng) hoặc khi nào chúng ta muốn truy cập vào các Node chúng ta phải thông qua Service
* Các Type của Services:
  => ClusterIP: Nó thiết lập một URL(URL dễ nhớ) để có thể truy cập vào các pod, nó chỉ expose pod trong cluster
  => NodePort: Nó giúp một pod cụ thể có thể được truy cập từ ngoài cluster thường được sử dụng cho mục đích develop
  => LoadBalancer: Mục đích khá giống với NodePort nhưng nó là cách phổ biến khi lên production.

<!--  -->

Introduction container and docker

Trong thời đại ngày nay tần suất ứng dụng cập nhật ngày càng dày đặc và nhanh chóng, mỗi phiên bản cập nhật cần
triển khai thêm những feature mới
+ cá nhân hóa
+ lưu trữ và theo dõi thông tin về hành vi của khách hàng
+ Tạo ra các kênh kết nối đến với khách hàng.

Khi chúng ta sử dụng server vật lý để quản lý resource thì chúng ta có thể phải trả tiền cho phần hiệu năng của 
server mà chúng ta chưa sử dụng mà chúng ta phải lên plan trước vài năm.
- cloud tận dụng cơ sở hạ tầng toàn cầu rất nhanh
- khi triển khai trên server vật lý thì sẽ sử dụng api rất nhiều bên, khó tích hợp, mở rộng nhưng cloud thì
chỉ do 1 bên cung cấp dễ tìm hiểu, cloud cũng hỗ trợ container.

- Lợi ích sử dụng container:
+ Thời gian khởi động nhanh hơn máy chủ, máy ảo truyền thống
+ Triển khai nhanh linh hoạt, tăng tốc độ phục hồi sau sự cố
+ Chạy nhiều container trên 1 máy chủ ảo để tiết kiệm chi phí.
+ Đóng gói ứng dụng thành các container để triển khai dễ dàng
+ Điều quan trọng nhất dẫn dắt các ứng dụng trở nên containerized đó chính là sự phát triển của kiến trúc microservice
+ Microserice tách một ứng dụng lớn thành nhiều dịch vụ nhỏ, mỗi dịch vụ chịu trách nhiệm cho 1 vấn đề điều này phù 
hợp với triết lý của container, nó giúp tận dụng tài nguyên tối ưu hơn so vs máy chủ ảo truyền thống

- Trong quá trình phát triển ứng dụng chúng ta sẽ tạo ra rất nhiều môi trường (local,statgin,production..),
ở mỗi môi trường chúng ta sẽ cần cài nhiều phiên bản các phụ thuộc khác nhau của ứng dụng, và các phiên bản
này có thể khác nhau => gây xung đột
=> để giải quyết bài toán đó chúng ta sử dụng docker là một nền tảng dành cho các dev và nhà quản trị đóng gói, triển khai 
chạy ứng dụng bằng các container, nó cho phép chúng ta tạo ra các môi trường đặc biệt và tách biệt để chạy và
phát triển ứng dụng và môi trường này chúng ta gọi nó là container, ví dụ khi cần run trên bất kì cloud nào (tất 
nhiên là cloud phải được cài docker) thì chúng ta chỉ cần chạy lệnh run container của docker => docker cho phép chúng ta triển
khai ứng dụng trên các môi trường một cách đồng nhất, dùng docker đóng gói các thành phần trong ứng dụng(server,
database,cache,queue..) thành các docker image và chúng khởi tạo các container trên các image.

- Docker container image: nó là một image cố định dùng để tạo ra các container, chúng ta sẽ cái đặt các phụ thuộc, 
thiết lập môi trường trong mỗi docker image từ image chúng ta có thể chạy các container bên trên nó như một layout
và từ một image chúng ta thể chạy  nhiều container đồng thời giống hệt nhau.
=> Hiểu đơn giản thì docker container như một máy chủ thu nhỏ, chứa môi trường để chạy ứng dụng đóng gói và tách biệt,
ưu điểm lớn nhất của container là quy mô của nó nhỏ hơn rất nhiều so với máy chủ truyền thống.

Mục đích ra đời của các trình điều phối

- Quản lý nhiều container trên nhiều host khác nhau là điều rất khó khăn, tưởng tượng có 100 container nhưng phải triển khai phân tải, vá lỗi, bảo mật thì rất khó khăn và nhiều công việc phải làm.
=> Đó là lý do chúng ta cần các trình điều phối (kubenetes, docker swarm..), các trình điều phối có nhiệm vụ quản lý, scaling, deploy, phục hồi hệ thống dựa trên container
=> AWS là nơi tốt nhất để chạy các ứng dụng hiện đại trên container.

Các loại dịch vụ Container chính được cung cấp trên AWS
- Tầng điều phối có ECS (Amazon Elastic Container Service) và EKS (Amazon
Elastic Container Service for Kubernetes) các service này giúp chúng ta triển
khai, quản lý, mở rộng các ứng dụng đang chạy trên container
- Tầng Hosting (hiểu đơn giản đây là các dịch vụ mà giúp chạy các container)
có EC2, Fargate (Serverless)
- Tầm Image Registry (giúp lưu trữ các image một cách bảo mật với giá thành rất thấp)
có Amazon Elastic Container Registry

Chi tiết từng loại Service

* ECS: giúp vận hành hệ thống ở quy mô lớn một cách tối ưu, chức năng chính là
Scheduling (đặt lịch) và Orchestraion (điều phối), bao gồm 2 thành phần chính
+ Cluster Manager:nó sẽ giám sát tình trạng các server trong cluster, cho phép
bạn đăng kí thêm các server vào cụm từ đó cho phép mở rộng thu hẹp, khắc phục lỗi của cụm  
hiểu đơn giản Cluster Manager đảm bảo cluster được chạy như thế nào 
+ Placement Engine: phụ trách việc CLuster sẽ chạy cái gì ở bên trong,
nó có khả năng định nghĩa các công việc và các task mà mình muốn chạy trong cluster
Ví dụ bạn có thể muốn chạy một số loại container nào đó trên một số máy trong Cluster 
=> ECS là cách dễ dàng nhất để bắt đầu triển khai và quản lý ứng dụng dựa trên container 

* EKS: Giúp triển khai quản lý, scaling ứng dụng container bằng Kubenetes
Kubernetes là một nền tảng mã nguồn mở nó là trình điều phối container tốt nhất
hiện giờ 
=> Cách hoạt động: AWS sẽ quản lý master node của cluster trong K8s


Amazon Elastic Compute (Cung cấp các máy ảo)

