import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/types';
import styles from './feed-screen.module.css';

export function FeedScreen() {

  const ROW_COUNT = 5;
  const COLUMN_COUNT = 3;

  const { orders, total, totalToday } = useSelector(
    (store:RootState) => store.wsFeed
  );

  const data = useMemo(() => {
    const done:Array<Array<number>> = [[]];
    const inprogress:Array<Array<number>> = [[]];
    orders.forEach(item => {
      if (item.status === 'done') {
        if (done[done.length - 1].length >= ROW_COUNT) {
          if (done.length >= COLUMN_COUNT) {
            return;
          }
          done.push([]);
        }
        done[done.length - 1].push(item.number);
      } else {
        if (inprogress[done.length - 1].length >= ROW_COUNT) {
          if (done.length >= COLUMN_COUNT) {
            return;
          }
          inprogress.push([]);
        }
        inprogress[inprogress.length - 1].push(item.number);
      }
    });
    return {
      done: done,
      inprogress: inprogress
    }
  }, [orders])

  return (
    <section>
      <div className={`${styles['order-table']} mt-5`}>
        <div className={`${styles['order-table__section']}`}>
          <h4 className='text text_type_main-medium mb-4'>Готовы:</h4>
          <div className={`${styles['order-table__lists']}`}>
            {data.done.map((item, index) => (
              <ul key={index} className={`${styles['order-table__list']}`}>
                {item.map(row => (
                  <li key={row} className={`${styles['order-table__item']} ${styles['order-table__item_done']} text text_type_digits-default`}>{row}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className={`${styles['order-table__section']}`}>
          <h4 className='text text_type_main-medium mb-4'>В работе:</h4>
          {data.inprogress.map((item, index) => (
            <ul key={index} className={`${styles['order-table__list']}`}>
              {item.map(row => (
                <li key={row} className='text text_type_digits-default'>{row}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className='mt-15'>
        <h3 className='text text_type_main-medium'>Выполнено за всё время:</h3>
        <p className={`${styles.statnum} text text_type_digits-large`}>{total}</p>
      </div>
      <div className='mt-15'>
        <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
        <p className={`${styles.statnum} text text_type_digits-large`}>{totalToday}</p>
      </div>
    </section>
  )
}
