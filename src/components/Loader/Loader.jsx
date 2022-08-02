import { MutatingDots } from 'react-loader-spinner';
const Loader = () => {
  return (
    <MutatingDots
      height="200"
      width="200"
      color="#cc40d3"
      secondaryColor="#00ccff"
      radius="20"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
export { Loader };
