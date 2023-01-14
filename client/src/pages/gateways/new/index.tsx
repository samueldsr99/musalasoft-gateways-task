import BaseLayout from "@/layouts/base";
import AddGatewayForm from "./_add-gateway-form";

const NewGateway = () => {
  return (
    <BaseLayout title="Add Gateway">
      <AddGatewayForm />
    </BaseLayout>
  );
};

export default NewGateway;
