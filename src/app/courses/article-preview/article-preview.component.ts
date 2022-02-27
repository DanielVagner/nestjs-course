import {
  Component
} from '@angular/core';
import { HighlightAutoResult, HighlightLoader } from 'ngx-highlightjs';

@Component({
  selector: 'article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent {
  response: HighlightAutoResult;

  constructor(private hljsLoader: HighlightLoader) { }

  code = `@Injectable()
  export class Interceptor implements HttpInterceptor {
  }`;
  code4 = `{
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
},`;
  code3 =
    `import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthenticationState } from '../store/authentication.state';`;
  code2 = `@Injectable()
  export class Interceptor implements HttpInterceptor {
      constructor(private store: Store) {}
  
      intercept(
          req: HttpRequest<any>,
  
          next: HttpHandler
      ): Observable<HttpEvent<any>> {
          const token = this.store.selectSnapshot(AuthenticationState.token);
          const os = this.store.selectSnapshot(AuthenticationState.os);
  
          /**
           * implement token on every Http call
           */
  
          if (token) {
              let modifiedRequest;
  
              modifiedRequest = req.clone({
                  params: req.params.set('token', token).set('os', os),
              });
  
              return next.handle(modifiedRequest);
          } else {
              return next.handle(req);
          }
      }
  }
  }`;


  onHighlight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}',
    };
  }

}
