import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (!cabins?.length) return <Empty resourceName={"cabins"} />;

  const filterValue = searchParams.get("discount") || "all";
  let filterCabins = cabins;

  if (filterValue === "all") filterCabins = cabins;

  if (filterValue === "no-discount")
    filterCabins = cabins?.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filterCabins = cabins?.filter((cabin) => cabin.discount > 0);

  // sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  filterCabins = filterCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filterCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
