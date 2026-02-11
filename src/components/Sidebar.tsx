import type { Theme, Collection } from '../types';

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly theme: Theme;
  readonly onToggleTheme: () => void;
  readonly onNewSession: () => void;
  readonly collections: readonly Collection[];
  readonly isCollectionEnabled: (id: string) => boolean;
  readonly onToggleCollection: (id: string) => void;
}

export const Sidebar = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  onNewSession,
  collections,
  isCollectionEnabled,
  onToggleCollection,
}: Props) => (
  <>
    <div
      className={`sidebar-backdrop ${isOpen ? 'sidebar-backdrop--visible' : ''}`}
      onClick={onClose}
      aria-hidden="true"
    />
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar-header">
        <button
          className="sidebar-close"
          onClick={onClose}
          type="button"
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-section-title">collections</h3>
        <ul className="sidebar-collection-list">
          {collections.map((collection) => (
            <li key={collection.id} className="sidebar-collection-item">
              <label className="sidebar-checkbox-label">
                <input
                  type="checkbox"
                  className="sidebar-checkbox"
                  checked={isCollectionEnabled(collection.id)}
                  onChange={() => onToggleCollection(collection.id)}
                />
                <span className="sidebar-checkbox-text">{collection.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <button
          className="sidebar-action"
          onClick={onToggleTheme}
          type="button"
        >
          {theme === 'light' ? '● dark mode' : '○ light mode'}
        </button>
        <button
          className="sidebar-action sidebar-action--danger"
          onClick={() => {
            onNewSession();
            onClose();
          }}
          type="button"
        >
          new session
        </button>
      </div>
    </aside>
  </>
);
