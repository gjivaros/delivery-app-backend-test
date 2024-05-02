import { useState } from "react"
import { DeliveryAsItem, PackageAsItem } from "../interfaces"
import {  fetchDelivery, fetchPackage } from "../helpers/fetch-data"

export function Customer() {
  const [packageId, setPackageId] = useState<string>()

  const [packageData, setPackage] = useState<PackageAsItem>()
  const [delivery, setDelivery] = useState<DeliveryAsItem>()

  const syncPackage = async (id: string) => {
    const data = await fetchPackage(id)
    setPackage(data)
    if (data?.active_delivery_id) {
      await syncDelivery(data.active_delivery_id)
    }
  }

  const syncDelivery = async (id: string) => {
    const data = await fetchDelivery(id)
    setDelivery(data)
  }
  console.log("packageId", packageId)
  return <div>

    <div>
      <form onSubmit={async e => {
        e.preventDefault()
        if (!packageId) return alert("Enter the package ID")
        await syncPackage(packageId)
      }}>
        <label >
          <input
            type="text"
            placeholder="Enter Package ID"
            value={packageId ?? ''}
            onChange={(e) => setPackageId(e.target.value)}
          />
        </label>
        <button type="submit">Track</button>

      </form>
    </div>

    <div className="Flex">
      <div>
        <div className="Text-left">
          <h3 >Package Details</h3>
          <p>Id: <span className="Active">{packageData?.package_id}</span></p>
          <p>From name: {packageData?.from_name}</p>
          <p>From adress: {packageData?.from_address}</p>
          <p>From name: {packageData?.to_name}</p>
          <p>From adress: {packageData?.from_address}</p>
          <p>Depth: {packageData?.depth}</p>
          <p>Height: {packageData?.height}</p>
          <p>Weight: {packageData?.weight}</p>
          <p>Description: {packageData?.description}</p>

        </div>

        <div className="Text-left">
          <h3 >Delivery Details</h3>
          <p>Id: <span className="Active">{delivery?.delivery_id}</span></p>
          <p>Status: {delivery?.status &&  <span className="Delivery-status">{delivery?.status}</span>} </p>
          <p>Start time: {delivery?.start_time}</p>
          <p>Pickup time: {delivery?.pickup_time}</p>
          <p>End time: {delivery?.end_time}</p>
        </div>
      </div>
      <div>map</div>
    </div>
  </div>
}