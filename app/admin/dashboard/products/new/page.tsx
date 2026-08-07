import ProductForm from "@/app/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold text-gray-900">
        New Product
      </h1>

      <ProductForm />

    </div>
  );
}