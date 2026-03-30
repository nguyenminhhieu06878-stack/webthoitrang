import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import CategoryProducts from '../components/CategoryProducts'
import Recommendations from '../components/Recommendations'
import Lookbook from '../components/Lookbook'
import CollectionHighlight from '../components/CollectionHighlight'
import Blog from '../components/Blog'
import YouMayLike from '../components/YouMayLike'

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoryProducts />
      <Recommendations />
      <Lookbook />
      <CollectionHighlight />
      <Blog />
      <YouMayLike />
    </>
  )
}

export default Home
