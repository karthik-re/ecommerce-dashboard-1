import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

const getSalesDate = async () => {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: { id: true },
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    count: data._count.id || 0,
  };
};

const getUserData = async () => {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);
  return {
    userCount,
    orderData:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
};

const getProductData = async () => {
  const [activeProducts, inactiveProducts] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return {
    activeProducts,
    inactiveProducts,
  };
};

const AdminPage = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesDate(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap4">
      <DashboardCard
        title="Sales"
        description={`${formatNumber(salesData.count)} items sold`}
        body={`${formatCurrency(salesData.amount)} amount earned`}
      />
      <DashboardCard
        title="Customers"
        description={`${formatNumber(userData.userCount)} customers`}
        body={`${formatCurrency(userData.orderData)} spent per customer`}
      />
      <DashboardCard
        title="Products"
        description={`${productData.activeProducts} active products`}
        body={`${productData.inactiveProducts} inactive products`}
      />
    </div>
  );
};

export default AdminPage;

type DashboardTypeProps = {
  title: string;
  description: string;
  body: string;
};

const DashboardCard = ({ title, description, body }: DashboardTypeProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardDescription>{description}</CardDescription>
      <CardContent>{body}</CardContent>
    </Card>
  );
};
