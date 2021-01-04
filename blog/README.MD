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
