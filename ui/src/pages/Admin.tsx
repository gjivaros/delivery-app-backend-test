import { useEffect, useState } from "react"
import { DeliveryAsItem, DeliveryStatus, EVENT, EventData, PackageAsItem } from "../interfaces"
import { fetchDelivery, fetchPackage } from "../helpers/fetch-data"
export function Admin() {

  const [ws, setWs] = useState<WebSocket>()

  const [deliveryId, setDeliveryId] = useState<string>()

  const [packageData, setPackage] = useState<PackageAsItem>()
  const [delivery, setDelivery] = useState<DeliveryAsItem>()

  const syncPackage = async (id: string) => {
    const data = await fetchPackage(id)
    setPackage(data)

  }

  const syncDelivery = async (id: string) => {
    const data = await fetchDelivery(id)

    if (data) {
      await syncPackage(data.package_id)
    }
    setDelivery(data)
  }


  const updateStatus = (status: DeliveryStatus) => {
    if (!delivery) return
    let thisWs = ws
    if (!thisWs) {
      thisWs = new WebSocket(import.meta.env.VITE_WS_URL)
      setWs(thisWs)
    }

    const payload: EventData = {
      event: 'status_changed',
      delivery_id: delivery.delivery_id,
      status
    }

    console.log("payload", payload)
    console.log("ws", thisWs)
    thisWs.send(JSON.stringify(payload))
  }
  console.log("packageId", deliveryId)


  useEffect(() => {
    if (delivery) {
      const ws = new WebSocket(import.meta.env.VITE_WS_URL)
      setWs(ws)
      ws.onmessage = (envt) => {
        console.log("event", envt)
        const payload = JSON.parse(envt.data)

        if(payload.event === EVENT.DELIVERY_UPDATED){
          setDelivery(payload.delivery_object)
        }
      }
    }
  }, [delivery?.delivery_id])


  return <div>

    <div>
      <form onSubmit={async e => {
        e.preventDefault()
        if (!deliveryId) return alert("Enter the package ID")
        await syncDelivery(deliveryId)
      }}>
        <label >
          <input
            type="text"
            placeholder="Enter Delivery ID"
            value={deliveryId ?? ''}
            onChange={(e) => setDeliveryId(e.target.value)}
          />
        </label>
        <button type="submit">Track</button>

      </form>
    </div>

    <div className="Flex Flex-justify">
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

          <p>Status: {delivery?.status && <span className="Delivery-status">{delivery?.status}</span>} </p>
          <p>Start time: {delivery?.start_time}</p>
          <p>Pickup time: {delivery?.pickup_time}</p>
          <p>End time: {delivery?.end_time}</p>
        </div>
      </div>
      <div>map</div>

      {
        delivery &&
        <div className="Flex Flex-col">
          <button
            type="button"
            disabled={delivery.status !== 'open'}
            onClick={() => updateStatus('picked_up')}
          >Picked Up</button>
          <button
            type="button"
            disabled={delivery.status !== 'picked_up'}
            onClick={() => updateStatus('in_transit')}
            >
            in_transit</button>
          <button
            type="button"
            disabled={delivery.status !== 'in_transit'}
            onClick={() => updateStatus('delivered')}
          >Delivered</button>
          <button
            type="button"
            disabled={delivery.status !== 'in_transit'}
            onClick={() => updateStatus('failed')}
          >Failed</button>
        </div>
      }
    </div>
  </div>
}