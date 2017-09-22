import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';

@Injectable()
export class CallService {

	private baseUrl = "http://2df34ac6.ngrok.io";

	constructor(private http: Http) {

	}

	private checkError(err) {
		console.log(err);
		return Observable.throw(err);
	}

	get(url) {
    	let headers = this.createRequestHeaders();
    	return this.http
      	.get(this.baseUrl + '/' + url, { body: '', headers: headers } )
      	.catch(err => this.checkError(err));
  	}

  	delete(url) {
    	let headers = this.createRequestHeaders();
    	return this.http
      		.delete(this.baseUrl + '/' + url, { body: '', headers: headers } )
      	.catch(err => this.checkError(err));
  	}

  	post(url, entity: any = '') {
    	let headers = this.createRequestHeaders();
    	return this.http
      	.post(this.baseUrl + '/' + url, entity, { headers: headers } )
      	.catch(err => this.checkError(err));
  	}

  	put(url, entity: any = '') {
    	let headers = this. createRequestHeaders();
    	return this.http
        .put(this.baseUrl + '/' + url, entity, { headers: headers } )
     	.catch(err => this.checkError(err));
  	}

	private addContentTypeHeader(headers: Headers) {
    	headers.append('Content-Type', 'application/json');
  	}

  	private createRequestHeaders() {
    	let result = new Headers();
    	this.addContentTypeHeader(result);
    	return result;
  	}

  	generateQuery(queries: any) {
  		let keys = Object.keys(queries);
  		let query = "?";
  		keys.forEach(key => {
  			query += key + '=' + queries[key] + '&';
  		});
  		return query.slice(0, -1);
  	}
}