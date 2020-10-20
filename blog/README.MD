case 1: Dựng moderation service để kiểm duyệt thông báo sau đó tạo event để communicate với comment service và query service,
case 3: Query service chỉ listen sự kiện từ comment serice, phần kiểm duyệt sẽ do moderation service đảm nhận và communicate với comment service.

Kubernetes = Popular Container Orchestration 
=> Container Orchestration : là chương trình sẽ lấy các container mà bạn muốn nó chạy và nó sẽ sử dụng một loạt các server(node) rồi quyết định cách chạy các container trong các node của nó, nó cung cấp một loại các api để deploy, maintain nhưng server có cùng infra
Hiểu đơn giản Kubernetes là một tập hợp các api sẽ chạy trên các app trong container để quản lý một nhóm các server và sau đó thực thi container trên Docker (theo mặc định nó có thể chạy trên Docker nhưng nó cũng có thể chạy các loại container khác.)
=> Sử dụng K8s có rất nhiều lợi ích:
+ Tự động hóa sự thay đổi và giám sát trạng thái của mọi container.

Kubectl: là CLI mà chúng ta sẽ dùng để giao tiếp với K8s
Node: được coi là một server trong K8s cluster 
Kubelet: chạy trên mỗi node, giúp các node và cluster của k8s có thể giao tiếp được với nhau. 
Control Plane: hiểu đơn giản nó chính là master của k8s, nó sẽ bao gồm API Server, Scheduler, Controller Manager
Kube-proxy: chạy trong Node, nó sẽ kiểm soát mạng trong Node.