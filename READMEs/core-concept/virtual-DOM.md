# Virtual DOM tree

`Quá trình tạo và cập nhật Virtual DOM:`

1. Khởi tạo (Initial mount):

- Khi trang web được tải lần đầu, Virtual DOM sẽ được khởi tạo với một "snapshot" trống.
- Sau đó, React hoặc các framework tương tự sẽ render lần đầu và tạo ra một snapshot (dạng cây Virtual DOM) của cấu trúc giao diện.

2. So sánh các snapshot:

- Sau mỗi lần cập nhật, Virtual DOM sẽ so sánh snapshot mới với snapshot cũ (sử dụng thuật toán diffing).
- Nếu có sự thay đổi trong state hoặc props, React sẽ tính toán sự khác biệt giữa snapshot cũ và mới. Chỉ những phần thay đổi sẽ được cập nhật thực tế vào DOM (gọi là "reconciliation").

3. Khi component có key mới:

- Khi một component có key mới, điều này có thể làm React coi đó là một component mới hoàn toàn.
- Điều này có nghĩa là React sẽ xóa component trong snapshot cũ và mount lại từ đầu trong snapshot mới. Đây là lý do tại sao việc sử dụng key trong danh sách các phần tử là rất quan trọng, giúp React xác định được các phần tử nào có thể tái sử dụng và phần tử nào cần được render lại hoàn toàn.

!!!`ATTENTION:`

- Key trong danh sách: Key giúp React tối ưu việc render lại các phần tử trong danh sách, xác định phần tử nào thay đổi, thêm, hoặc xóa. Nếu key thay đổi, React sẽ không cố gắng tái sử dụng phần tử mà sẽ coi nó là một phần tử mới, dẫn đến việc xóa và mount lại từ đầu.
