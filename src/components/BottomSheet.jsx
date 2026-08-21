import { useState } from "react";
import { Drawer } from "vaul";
import "../css/BottomSheet.css";

function BottomSheet() {
  const [snap, setSnap] = useState(0.5); // 스냅 포인트는 인덱스나 비율로

  return (
    <Drawer.Root
      open={true}
      dismissible={false}
      modal={false}
      snapPoints={[0.2, 0.5, 0.9]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <Drawer.Portal>
        <Drawer.Content className="drawer-content">
          <div className="drawer-handle" />
          <div style={{ padding: "16px" }}>
            <p>테스트 내용입니다</p>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default BottomSheet;