export class NotFound extends Error {
    constructor(resource) {
        super()
        this.message = `Cannot find resource "${resource}". Please modify your request and try again`
        this.status = 404
    }
}

export class NotHealthy extends Error {
    constructor(...services) {
        super()
        this.message = `System not healthy due to the following services: ${services.join(', ')}. Please check the logs and fix this issue before trying your request again.`
        this.status = 500
    }
}

export class MethodNotImplemented extends Error {
    constructor(method) {
        super()

        this.message = `The "${method}" method is not implemented on this path. Please check your request and try again.`
        this.status = 501
    }
}

export class InvalidResponse extends Error {
    constructor(reasons) {
      super()
  
      this.message = `The response from this server was unacceptable due to
      ${reasons.join('\n')}.
  Fix the server or turn it on sloppy mode.`
      this.status = 500
    }
  }