// ==UserScript==
// @name WordReference 6 direct buttons!
// @namespace http://tampermonkey.net/
// @version 1.0.0
// @author nmaxcom
// @match http://www.wordreference.com/*
// ==/UserScript==

(function(){
  'use strict';

  const searchBox = document.getElementById('search');

  function action(e){
    let searchWord = document.querySelector('input#si').value || document.querySelector('h3.headerWord').innerText;

    switch(e.target.className){
      case 'esp def': location.assign(`/definicion/${searchWord}`);
        break;
      case 'esp syn': location.assign(`/sinonimos/${searchWord}`);
        break;
      case 'espeng': location.assign(`/es/en/translation.asp?spen=${searchWord}`);
        break;
      case 'eng def': location.assign(`/definition/${searchWord}`);
        break;
      case 'eng syn': location.assign(`/synonyms/${searchWord}`);
        break;
      case 'engesp': location.assign(`/es/translation.asp?tranword=${searchWord}`);
        break;
    }

  }

  const buttonsHtml = `<div class="favs">
<button type="button" class="esp def">def</button>
<button type="button" class="esp syn">syn</button>
<button type="button" class="espeng">-></button>

<button type="button" class="eng def">def</button>
<button type="button" class="eng syn">syn</button>
<button type="button" class="engesp">-></button>
</div>`;

  searchBox.insertAdjacentHTML('beforeend', buttonsHtml);

  const buttonsDOM = document.querySelectorAll('.favs button');
  buttonsDOM.forEach(el=>el.addEventListener('click', e => action(e)));

  // Now style'em!
  const style = document.createElement('style');
  style.innerHTML = `
#search{
height: unset !important;
}

.favs {
width: 100%;
display: inline-block;
}

.favs button {
height: 29px;
width: 85px;
position: relative;
border: 0;
padding: 15px 25px;
display: inline-block;
text-align: right;
color: white;
margin: 9px;
padding: 8px 18px;
font-size: 14px;
background-color: #7fccde;
box-shadow: 0px 4px 0px #73B9C9;
}

.favs button.esp {
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAACcUlEQVRIS+2WXUiTYRiGr2/f3NStocycmSxdlgodhBYSHXRglAXRQVBkP2dWEHmgSeRBFBEY/hREQfSDUIRgIWhpBznQ0jCbWNq0hkT+pEu3as5Wn+5bbKkQGHMx9MT37IXnve/rebkfeIQykT0KuAUYWNxjlyFfqBAZXQLz2VbtfgCf/1a4IWNR+6/s6Q34LQMs/Q+8Oo9PjFCSuXfzXxnwyTDi1KLXeVCrvLy3+XhQp2WFVuD0cXegdsCuQ4WTBIMy5Px0PHz5JwP/AnC5lXT0rWbUoWGV3k3T4y40K1NJTE5kTYKLcSdMSjpidT/JyfqENnoqJIigALNq/Y4t2BrHyLz3hLEUI6anzXS3v6Cvsx6FV2D/jjeoVIFBCuksCECWYTq1EWtRASnVj5iKjiJuaIxfnknMtTfYlVeMbDuCQuoPydxfHBRAlgXqzLHk5ldjbX1Ghm0Ql+RBeaUSm07L8Kmj7Dt2jrbaErLXtiCKckgQQQFsAzG0didx4GQF9qEPJKdl4bl5HensGaQoNZbyEnIPFlFXdZF0Qzvrjc7wAvT0x1F66R13W7qxWsy4HKNMfBlm/OodYnI2oc7eGgC4XHCIndscbEx3hRdgxC5Qds1LabUZ6+smulrrAwbeaS+iUiQ+aR2784ppuH+BbGMDer0YXgC/2tveCEzba2hpqOFjbxs+H2h1Gjqfd2JMTaOwvIqvlsPoNYMhmS8ohHOKQgSS5OW7O5Jmi4EM0wSmxG9Eqr0ICiX4Qpv/Wd2gIZyvJfcPFdpoKeRu53vwXwBhcZ4RmQNY3geWf2CJl9LPwsxafhuID2fKF6D1WYYTvwHRVyevJpmofwAAAABJRU5ErkJggg==);
background-repeat: no-repeat;
background-size: 17px;
background-position: 15px 10px;
}

.favs button.eng {
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAFJklEQVRIS+2Wa1BUZRjHf2f3wAK7G4iKiOItNRgZawxdaSa/mF3GcHJSKTPvhXjBTEnLQMOAtMQL5XhDx2tZQ5OCHwybRmcSSR2VodEhvCIBXgYW2HV195zTnHfdlU1KqQ/1ofPlvM/7Ppf/+7zPTRpHUvZgKpZacBgAWtcV6j/2bYFfKm+Kddsve10XQVrmzwjY98llzb8vExYmsyQvIoDPJ9eKWa1gcI6UjVnxGW8LYMaECQwftouampa/BcBolCj6diwVl4+2C0DYwqxK+aDpxLThCUhR0Zgzc5AThwmhxiYPKSkXabYrfiWlpQOxWo00xMej2u1i3xAeTrdz52hpURg1qkrsrS+IZWiiGUmSUG9cx/lxJp6fj/n1bD9eKdZ+AFOGDfIeShIhE6cQOisdKTiY5maFjIwazp69LY4fBiA5uZqNG3sRFxcq+O/+WIojdzlasxcsRhl53EQKFy72msteVyg8MF9r4u6+neC+Kw7kAU9gyV6J3H8giqJRVNRIfn7DXwK4fVulsdFDTEwwmqOV1s9yuVPynf/WRtuzmNIXY+jVB1VV2L+/+j6AjLenotbW4CpYhefoD150JhPmOQsIe2MKigpHjrRgs1kwmw0BT2Ds0YOoEyfQNOFA3GdO0Zy5GKX2mveJevclJH0xctIIQZ8+7SQv7xDFxReQYKX2wgt9ycp6iSFDwgSD/lbOtXmoF38VdLAtifDslWidu6EHl26kbQwYY2OJKi9HR9BSkI9jx1ZQFCSLlZDpszGNnwRBQdTXuykpsbN79y3Ky4u9l9QB6AubLZmUlEiSkyPo2TNIKHAV7eX2pvWoLXYMj4UT8eFHhL74shBsD4By4zr1I59BkgyYxrxKaNq7GCI7C/6DB+1s2HAdh0MVtB+ALwYy06f73+pRFu164FEE7/GsWL8tMAj/NQC+OvBa9+4dwP/PWb+qq/N64H8APg9MjIvrkF/V5maRdt5EN2CwWjskv/f8+f9IEPrS8J1pUwQiWZYwmQyi2KCpaE4nmqogBZswhIT4b9leGmoeN6rT2zMMoaEgB4m1x6Phcnnz3/et3b7D64G2hSgjI5rRo8PFQcuhg9QtmoeutNeaz+n0ylixrztdx/ZndcB1oZpLUyfhqqoicmYaUe8vQ5JlysocrF5dz82bHqEnoBJ2725mz57JJCWZ0dxuGnKyuFW4CVPvPvTbsZuwQQniua/WuOjSOfjBXuArxfeup7S2cnleGk3FBwh9eiixG7YR1KMnDQ0e1q5toKys9cFKqDcjd+01rrw1GeeZU4Q/N4rHN29DjohAUTW+L7XzSW49JSUDHpgHjDExRJ08ib1ZISREwhRsQNM06taspjZvBUZrOLEFm7GOfF5A1PvB+PFbAoMwtU83rqan4mlqosfCRfT8IBPJaOSOW+XTVfWUFHv7+cPmgdTUK3yxoRedImTB33S4lOqZ04TebnMXEL0kC0k2cuBAFXPnHr5fiGzWUIwWM/03FdI5eYxX2O5hdtpVLl684w+ehwHQJ6KwMAM5uTGidRskCdflS5x/fQLOykostiT6btnJ1n6xXg/46sCIpxKI//JrwuLihftOnHKw5L1anM7A6H0UAD60k96MZFZqV2TZgOJwUD0njRvf7COoa1eOXam99wR/GErnuRWWLf+J3JyygLTxER2ZinWZxMRoSg+nULBjj1DRdppuxapI+lj+JBVLzffG8n3Dd1F+/Ld2jeubHQWgy3TqFMKC5ZYAALrxChJyfwdy2oeb0oaIwAAAAABJRU5ErkJggg==);
background-repeat: no-repeat;
background-size: 17px;
background-position: 15px 10px;
}

.favs button.engesp {
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAFJklEQVRIS+2Wa1BUZRjHf2f3wAK7G4iKiOItNRgZawxdaSa/mF3GcHJSKTPvhXjBTEnLQMOAtMQL5XhDx2tZQ5OCHwybRmcSSR2VodEhvCIBXgYW2HV195zTnHfdlU1KqQ/1ofPlvM/7Ppf/+7zPTRpHUvZgKpZacBgAWtcV6j/2bYFfKm+Kddsve10XQVrmzwjY98llzb8vExYmsyQvIoDPJ9eKWa1gcI6UjVnxGW8LYMaECQwftouampa/BcBolCj6diwVl4+2C0DYwqxK+aDpxLThCUhR0Zgzc5AThwmhxiYPKSkXabYrfiWlpQOxWo00xMej2u1i3xAeTrdz52hpURg1qkrsrS+IZWiiGUmSUG9cx/lxJp6fj/n1bD9eKdZ+AFOGDfIeShIhE6cQOisdKTiY5maFjIwazp69LY4fBiA5uZqNG3sRFxcq+O/+WIojdzlasxcsRhl53EQKFy72msteVyg8MF9r4u6+neC+Kw7kAU9gyV6J3H8giqJRVNRIfn7DXwK4fVulsdFDTEwwmqOV1s9yuVPynf/WRtuzmNIXY+jVB1VV2L+/+j6AjLenotbW4CpYhefoD150JhPmOQsIe2MKigpHjrRgs1kwmw0BT2Ds0YOoEyfQNOFA3GdO0Zy5GKX2mveJevclJH0xctIIQZ8+7SQv7xDFxReQYKX2wgt9ycp6iSFDwgSD/lbOtXmoF38VdLAtifDslWidu6EHl26kbQwYY2OJKi9HR9BSkI9jx1ZQFCSLlZDpszGNnwRBQdTXuykpsbN79y3Ky4u9l9QB6AubLZmUlEiSkyPo2TNIKHAV7eX2pvWoLXYMj4UT8eFHhL74shBsD4By4zr1I59BkgyYxrxKaNq7GCI7C/6DB+1s2HAdh0MVtB+ALwYy06f73+pRFu164FEE7/GsWL8tMAj/NQC+OvBa9+4dwP/PWb+qq/N64H8APg9MjIvrkF/V5maRdt5EN2CwWjskv/f8+f9IEPrS8J1pUwQiWZYwmQyi2KCpaE4nmqogBZswhIT4b9leGmoeN6rT2zMMoaEgB4m1x6Phcnnz3/et3b7D64G2hSgjI5rRo8PFQcuhg9QtmoeutNeaz+n0ylixrztdx/ZndcB1oZpLUyfhqqoicmYaUe8vQ5JlysocrF5dz82bHqEnoBJ2725mz57JJCWZ0dxuGnKyuFW4CVPvPvTbsZuwQQniua/WuOjSOfjBXuArxfeup7S2cnleGk3FBwh9eiixG7YR1KMnDQ0e1q5toKys9cFKqDcjd+01rrw1GeeZU4Q/N4rHN29DjohAUTW+L7XzSW49JSUDHpgHjDExRJ08ib1ZISREwhRsQNM06taspjZvBUZrOLEFm7GOfF5A1PvB+PFbAoMwtU83rqan4mlqosfCRfT8IBPJaOSOW+XTVfWUFHv7+cPmgdTUK3yxoRedImTB33S4lOqZ04TebnMXEL0kC0k2cuBAFXPnHr5fiGzWUIwWM/03FdI5eYxX2O5hdtpVLl684w+ehwHQJ6KwMAM5uTGidRskCdflS5x/fQLOykostiT6btnJ1n6xXg/46sCIpxKI//JrwuLihftOnHKw5L1anM7A6H0UAD60k96MZFZqV2TZgOJwUD0njRvf7COoa1eOXam99wR/GErnuRWWLf+J3JyygLTxER2ZinWZxMRoSg+nULBjj1DRdppuxapI+lj+JBVLzffG8n3Dd1F+/Ld2jeubHQWgy3TqFMKC5ZYAALrxChJyfwdy2oeb0oaIwAAAAABJRU5ErkJggg==),
url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAACcUlEQVRIS+2WXUiTYRiGr2/f3NStocycmSxdlgodhBYSHXRglAXRQVBkP2dWEHmgSeRBFBEY/hREQfSDUIRgIWhpBznQ0jCbWNq0hkT+pEu3as5Wn+5bbKkQGHMx9MT37IXnve/rebkfeIQykT0KuAUYWNxjlyFfqBAZXQLz2VbtfgCf/1a4IWNR+6/s6Q34LQMs/Q+8Oo9PjFCSuXfzXxnwyTDi1KLXeVCrvLy3+XhQp2WFVuD0cXegdsCuQ4WTBIMy5Px0PHz5JwP/AnC5lXT0rWbUoWGV3k3T4y40K1NJTE5kTYKLcSdMSjpidT/JyfqENnoqJIigALNq/Y4t2BrHyLz3hLEUI6anzXS3v6Cvsx6FV2D/jjeoVIFBCuksCECWYTq1EWtRASnVj5iKjiJuaIxfnknMtTfYlVeMbDuCQuoPydxfHBRAlgXqzLHk5ldjbX1Ghm0Ql+RBeaUSm07L8Kmj7Dt2jrbaErLXtiCKckgQQQFsAzG0didx4GQF9qEPJKdl4bl5HensGaQoNZbyEnIPFlFXdZF0Qzvrjc7wAvT0x1F66R13W7qxWsy4HKNMfBlm/OodYnI2oc7eGgC4XHCIndscbEx3hRdgxC5Qds1LabUZ6+smulrrAwbeaS+iUiQ+aR2784ppuH+BbGMDer0YXgC/2tveCEzba2hpqOFjbxs+H2h1Gjqfd2JMTaOwvIqvlsPoNYMhmS8ohHOKQgSS5OW7O5Jmi4EM0wSmxG9Eqr0ICiX4Qpv/Wd2gIZyvJfcPFdpoKeRu53vwXwBhcZ4RmQNY3geWf2CJl9LPwsxafhuID2fKF6D1WYYTvwHRVyevJpmofwAAAABJRU5ErkJggg==);
background-repeat: no-repeat;
background-size: 17px;
background-position: 10px 10px,57px 10px;
text-align: center;
}

.favs button.espeng {
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAFJklEQVRIS+2Wa1BUZRjHf2f3wAK7G4iKiOItNRgZawxdaSa/mF3GcHJSKTPvhXjBTEnLQMOAtMQL5XhDx2tZQ5OCHwybRmcSSR2VodEhvCIBXgYW2HV195zTnHfdlU1KqQ/1ofPlvM/7Ppf/+7zPTRpHUvZgKpZacBgAWtcV6j/2bYFfKm+Kddsve10XQVrmzwjY98llzb8vExYmsyQvIoDPJ9eKWa1gcI6UjVnxGW8LYMaECQwftouampa/BcBolCj6diwVl4+2C0DYwqxK+aDpxLThCUhR0Zgzc5AThwmhxiYPKSkXabYrfiWlpQOxWo00xMej2u1i3xAeTrdz52hpURg1qkrsrS+IZWiiGUmSUG9cx/lxJp6fj/n1bD9eKdZ+AFOGDfIeShIhE6cQOisdKTiY5maFjIwazp69LY4fBiA5uZqNG3sRFxcq+O/+WIojdzlasxcsRhl53EQKFy72msteVyg8MF9r4u6+neC+Kw7kAU9gyV6J3H8giqJRVNRIfn7DXwK4fVulsdFDTEwwmqOV1s9yuVPynf/WRtuzmNIXY+jVB1VV2L+/+j6AjLenotbW4CpYhefoD150JhPmOQsIe2MKigpHjrRgs1kwmw0BT2Ds0YOoEyfQNOFA3GdO0Zy5GKX2mveJevclJH0xctIIQZ8+7SQv7xDFxReQYKX2wgt9ycp6iSFDwgSD/lbOtXmoF38VdLAtifDslWidu6EHl26kbQwYY2OJKi9HR9BSkI9jx1ZQFCSLlZDpszGNnwRBQdTXuykpsbN79y3Ky4u9l9QB6AubLZmUlEiSkyPo2TNIKHAV7eX2pvWoLXYMj4UT8eFHhL74shBsD4By4zr1I59BkgyYxrxKaNq7GCI7C/6DB+1s2HAdh0MVtB+ALwYy06f73+pRFu164FEE7/GsWL8tMAj/NQC+OvBa9+4dwP/PWb+qq/N64H8APg9MjIvrkF/V5maRdt5EN2CwWjskv/f8+f9IEPrS8J1pUwQiWZYwmQyi2KCpaE4nmqogBZswhIT4b9leGmoeN6rT2zMMoaEgB4m1x6Phcnnz3/et3b7D64G2hSgjI5rRo8PFQcuhg9QtmoeutNeaz+n0ylixrztdx/ZndcB1oZpLUyfhqqoicmYaUe8vQ5JlysocrF5dz82bHqEnoBJ2725mz57JJCWZ0dxuGnKyuFW4CVPvPvTbsZuwQQniua/WuOjSOfjBXuArxfeup7S2cnleGk3FBwh9eiixG7YR1KMnDQ0e1q5toKys9cFKqDcjd+01rrw1GeeZU4Q/N4rHN29DjohAUTW+L7XzSW49JSUDHpgHjDExRJ08ib1ZISREwhRsQNM06taspjZvBUZrOLEFm7GOfF5A1PvB+PFbAoMwtU83rqan4mlqosfCRfT8IBPJaOSOW+XTVfWUFHv7+cPmgdTUK3yxoRedImTB33S4lOqZ04TebnMXEL0kC0k2cuBAFXPnHr5fiGzWUIwWM/03FdI5eYxX2O5hdtpVLl684w+ehwHQJ6KwMAM5uTGidRskCdflS5x/fQLOykostiT6btnJ1n6xXg/46sCIpxKI//JrwuLihftOnHKw5L1anM7A6H0UAD60k96MZFZqV2TZgOJwUD0njRvf7COoa1eOXam99wR/GErnuRWWLf+J3JyygLTxER2ZinWZxMRoSg+nULBjj1DRdppuxapI+lj+JBVLzffG8n3Dd1F+/Ld2jeubHQWgy3TqFMKC5ZYAALrxChJyfwdy2oeb0oaIwAAAAABJRU5ErkJggg==),
url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAACcUlEQVRIS+2WXUiTYRiGr2/f3NStocycmSxdlgodhBYSHXRglAXRQVBkP2dWEHmgSeRBFBEY/hREQfSDUIRgIWhpBznQ0jCbWNq0hkT+pEu3as5Wn+5bbKkQGHMx9MT37IXnve/rebkfeIQykT0KuAUYWNxjlyFfqBAZXQLz2VbtfgCf/1a4IWNR+6/s6Q34LQMs/Q+8Oo9PjFCSuXfzXxnwyTDi1KLXeVCrvLy3+XhQp2WFVuD0cXegdsCuQ4WTBIMy5Px0PHz5JwP/AnC5lXT0rWbUoWGV3k3T4y40K1NJTE5kTYKLcSdMSjpidT/JyfqENnoqJIigALNq/Y4t2BrHyLz3hLEUI6anzXS3v6Cvsx6FV2D/jjeoVIFBCuksCECWYTq1EWtRASnVj5iKjiJuaIxfnknMtTfYlVeMbDuCQuoPydxfHBRAlgXqzLHk5ldjbX1Ghm0Ql+RBeaUSm07L8Kmj7Dt2jrbaErLXtiCKckgQQQFsAzG0didx4GQF9qEPJKdl4bl5HensGaQoNZbyEnIPFlFXdZF0Qzvrjc7wAvT0x1F66R13W7qxWsy4HKNMfBlm/OodYnI2oc7eGgC4XHCIndscbEx3hRdgxC5Qds1LabUZ6+smulrrAwbeaS+iUiQ+aR2784ppuH+BbGMDer0YXgC/2tveCEzba2hpqOFjbxs+H2h1Gjqfd2JMTaOwvIqvlsPoNYMhmS8ohHOKQgSS5OW7O5Jmi4EM0wSmxG9Eqr0ICiX4Qpv/Wd2gIZyvJfcPFdpoKeRu53vwXwBhcZ4RmQNY3geWf2CJl9LPwsxafhuID2fKF6D1WYYTvwHRVyevJpmofwAAAABJRU5ErkJggg==);
background-repeat: no-repeat;
background-size: 17px;
background-position: 57px 10px,10px 10px;
text-align: center;
}

.favs button:active {
top: 4px;
box-shadow: 0 0 #73B9C9;
background-color: #70B4C4;
}

.favs button:focus {
outline: none;
}`;

  // Get the first script tag
  var firstScript = document.querySelector('script');
  firstScript.parentNode.insertBefore(style, firstScript);

})();
