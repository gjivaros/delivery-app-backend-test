import { io, server } from "./app";
import { EVENT, EventData, StatusChanged } from "./constants";
import { appConfig } from "./context";
import { initDataSource } from "./database/data-source";
import { formatDeliveryEditWithStatus } from "./helpers/format-update-delivery-input";
import { deliveryService } from "./modules/delivery/delivery.service";
import { appLog } from "./share/app-log";

async function main() {
  await initDataSource(appConfig.database.url);

  // io.on("connection", (socket) => {
  //   console.log("a user connected");

  //   socket.emit("location_changed", (payload: any) => {
  //     console.log("location_changed", payload);
  //   });

  //   socket.emit("status_changed", (payload: any) => {
  //     console.log("status_changed", payload);
  //   });

  //   socket.on("delivery_updated", (payload) => {
  //     io.emit("delivery_updated", payload);
  //   });
  // });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("message", async (message) => {
      try {
        const payload: EventData = JSON.parse(message.toString());

        switch (payload.event) {
          case "status_changed":
            const delivery = await updateDeliveryStatus(payload);

            if (delivery) {
              const data = {
                event: EVENT.DELIVERY_UPDATED,
                delivery_object: delivery,
              };
              socket.send(JSON.stringify(data));
            }
        }

        console.log("new message", payload);

        console.log("typeof payload", typeof payload);
      } catch (error) {
        console.log("socker error", error);
      }
    });
  });

  server.listen(appConfig.thisServer.port, () => {
    appLog.info(`Listening: ${appConfig.thisServer.url}`);
  });
}

main().catch(appLog.error);

async function updateDeliveryStatus(payload: StatusChanged) {
  await deliveryService.update(
    { delivery_id: payload.delivery_id },
    formatDeliveryEditWithStatus({ status: payload.status })
  );

  return deliveryService.findOne({ delivery_id: payload.delivery_id });
}
