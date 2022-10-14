import {v4 as uuidv4} from 'uuid';

const retrievedUUID = typeof window !== 'undefined' ? localStorage.getItem('UUID') : null

interface HogEventProp {
  distinct_id: string
  data: string
}

export interface HogEvent {
  api_key: string
  event: string
  properties: {
    [key: string]: HogEventProp
  }
}

type HogResponse = {
  data: string
}

export function posthogEvent(eventName:string) {
  if (typeof window !== 'undefined') {
    //log to check if UUID is already present
    if (retrievedUUID) {
      document.cookie = "UUID=" + retrievedUUID;
      createEvent(eventName)
      console.log("UUID:", retrievedUUID)
    }

    //If not present, generate a new one and put it in storage.
    if (retrievedUUID === null)
    {
      let myuuid = uuidv4();
      localStorage.setItem('UUID', myuuid);
      document.cookie = "UUID=" + myuuid;
      console.log("new UUID:", myuuid)
      createEvent(eventName)
    }
  }
}

export async function createEvent(eventName:string): Promise<HogResponse> {
  try {

    var posthogEvent = eventName;

    const response = await fetch("https://app.posthog.com/capture/", {
      method: "POST",
      body: JSON.stringify({
        api_key: "phc_VzveyNxrn2xyiKDYn7XjrgaqELGeUilDZGiBVh6jNmh",
        event: posthogEvent,
        properties: {
          distinct_id: retrievedUUID,
          data:  "TThis adds posthog events to Tally website",
          current_url: window.location.href,
          $lib: window.location.href,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const result = (await response.json()) as HogResponse

    return result
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error.message)
    }
    return Promise.reject(console.log("unexpected error: "))
  }
}
