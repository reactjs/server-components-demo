import Products from './Products.server'
import {useLocation} from './LocationContext.client'
import {Suspense} from 'react'
import NoteListSkeleton from './NoteListSkeleton'

export default function HomeScreen() {
  const [location] = useLocation()
  console.info(location)
  return (
    <div className="container-fluid">
      <div className="row justify-content-md-center">
        <Suspense fallback={<NoteListSkeleton />}>
          <Products searchText={location.searchText} />
        </Suspense>
      </div>
    </div>
  )
}
