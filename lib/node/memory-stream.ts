import { Transform } from 'stream'

export class MemoryStream extends Transform {

  private _buffer = new Buffer('')

  _transform( chunk: Buffer|string, encoding: string, callback: (err?: Error) => void ) {
    var bf = Buffer.isBuffer(chunk) ? chunk : new Buffer(chunk)
    this._buffer = Buffer.concat([this._buffer, bf])
    this.push( chunk, encoding )
    callback()
  }

  data(encoding?: string) {
    return encoding ? this._buffer.toString(encoding) : this._buffer
  }

}