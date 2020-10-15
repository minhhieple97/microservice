case 1: Dựng moderation service để kiểm duyệt thông báo sau đó tạo event để communicate với comment service và query service,
case 3: Query service chỉ listen sự kiện từ comment serice, phần kiểm duyệt sẽ do moderation service đảm nhận và communicate với comment service.
