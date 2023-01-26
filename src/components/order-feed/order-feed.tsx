import FeedItem from "../feed-item/feed-item";
import styles from "./order-feed.module.css";
import { TOrderFull } from "../../utils/types";

interface IOrderFeedProps {
  type: string;
  orders: Array<TOrderFull>;
}

function OrderFeed({ type, orders }: IOrderFeedProps) {

  return (
    <section>
      {type === "all" && (
        <h1 className="text text_type_main-large mt-5 mb-5">Лента заказов</h1>
      )}
      <div className={`${styles.content} pr-2`}>
        <ul className={styles["order-list"]}>
          {orders.map((item) => (
            <FeedItem data={item} key={item._id} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default OrderFeed;
