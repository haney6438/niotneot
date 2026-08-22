import { useState } from "react";
import { Drawer } from "vaul";
import "../css/BottomSheet.css";

function BottomSheet({ content }) {
  const [snap, setSnap] = useState(0.5);

  if (!content) return null; // 표시할 내용 없으면 아예 안 그림

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
          <div className="drawer-body">
            <div className="link-list">
              {content.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-item"
                >
                  <img src={link.image} alt={link.label} className="link-thumb" />
                  <div className="link-text">
                    <p className="link-title">{link.label}</p>
                    <p className="link-desc">{link.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default BottomSheet;