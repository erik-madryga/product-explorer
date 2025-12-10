/// <reference types="react" />
import { getProducts } from "../../../lib/getProducts";

export default async function ProductPage({
  params,
}: {
   params: Promise<any> | any;
}) {
  const products = await getProducts();
  const product = products.find((p: { id: string; }) => p.id === params.id);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="space-y-4">
      <div className="flex gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-96 h-96 object-cover rounded"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-slate-600 mt-2">{product.description}</p>
          <div className="mt-4 text-xl font-semibold">
            ${product.price.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
