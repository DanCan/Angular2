import {Pipe} from '@angular/core'

@Pipe({
  name: "started"
})
export class StartedPipe{
  transform(value) {
    return value.filter((item)=> item.status === "started");
  }
}
