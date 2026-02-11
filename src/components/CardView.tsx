import { useAppStateContext } from '../context';
import { HanziDisplay } from './HanziDisplay';
import { Translation } from './Translation';
import { ContextNote } from './ContextNote';
import { NavZones } from './NavZones';
import { IdleHint } from './IdleHint';

export const CardView = () => {
  const {
    mode,
    current,
    canGoNext,
    canGoPrev,
    next,
    prev,
    revealed,
    reveal,
    showHint,
  } = useAppStateContext();

  if (!current) {
    return (
      <main className="card-view">
        <div className="empty-state">
          {mode === 'test'
            ? 'No characters learned yet. Switch to learn mode first.'
            : 'No characters available.'}
        </div>
      </main>
    );
  }

  const isTest = mode === 'test';
  const showTranslation = !isTest || revealed;

  return (
    <main className="card-view">
      <NavZones
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        onPrev={prev}
        onNext={next}
      />

      <HanziDisplay
        hanzi={current.hanzi}
        clickable={isTest && !revealed}
        onClick={reveal}
      />

      <div className="card-details">
        {showTranslation ? (
          <>
            <Translation
              pinyin={current.pinyin}
              translation={current.translation}
            />
            {current.context && <ContextNote context={current.context} />}
          </>
        ) : (
          showHint && <IdleHint message="click the character to reveal" />
        )}
      </div>
    </main>
  );
};
