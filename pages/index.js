import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({ product }) {
  console.log(product);

  return (
    <div>
      <Header />
      <Featured />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "646b5762ed4292ac5427e971";
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);
  return {
    props: { product: JSON.stringify(product) },
  };
}
