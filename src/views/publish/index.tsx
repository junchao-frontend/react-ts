import { useSearchParams } from 'react-router-dom'
const Publish = () => {
  const [params] = useSearchParams()
  console.log(params.get('id'))

  return <div>publish</div>
}

export default Publish
