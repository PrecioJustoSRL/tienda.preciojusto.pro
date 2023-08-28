'use client'

import { QrScanner } from '@yudiel/react-qr-scanner';
import { useUser } from '@/context/Context.js'

const Component = () => {
  const { user, userDB, cart, modal, setModal, productDB, setUserProduct, setUserItem, item, filter, setFilter, filterQR, setTienda, setFilterQR, recetaDBP, setRecetaDBP, tienda, setIntroClientVideo, search, setSearch, distributorPDB, setUserDistributorPDB, webScann, setWebScann } = useUser()

  const handlerQR = (result) => {
    if (result) {
      setFilterQR(result)
      setWebScann(false)
    }
  }

  return (
    <QrScanner
      constraints={{
        facingMode: 'environment'
      }}
      onDecode={(result) => handlerQR(result)}
      onError={(error) => console.log(error?.message)}
    />
  );
}
export default Component