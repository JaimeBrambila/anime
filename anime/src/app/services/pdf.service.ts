import { Injectable } from '@angular/core';

@Injectable()
export class PDFService {

    private ParseContainer(cnt, e, p, styles?) {
        let elements = [];
        let children = e.childNodes;
        if (children.length != 0) {
            for (let i = 0; i < children.length; i++) p = this.ParseElement(elements, children[i], p, styles);
        }
        if (elements.length != 0) {
            for (let i = 0; i < elements.length; i++) cnt.push(elements[i]);
        }
        return p;
    }

    private ComputeStyle(o, styles) {
        for (let i = 0; i < styles.length; i++) {
            let st = styles[i].trim().toLowerCase().split(":");
            if (st.length == 2) {
                switch (st[0]) {
                    case "font-size": {
                        o.fontSize = parseInt(st[1]);
                        break;
                    }
                    case "text-align": {
                        switch (st[1]) {
                            case "right": o.alignment = 'right'; break;
                            case "center": o.alignment = 'center'; break;
                        }
                        break;
                    }
                    case "font-weight": {
                        switch (st[1]) {
                            case "bold": o.bold = true; break;
                        }
                        break;
                    }
                    case "text-decoration": {
                        switch (st[1]) {
                            case "underline": o.decoration = "underline"; break;
                        }
                        break;
                    }
                    case "font-style": {
                        switch (st[1]) {
                            case "italic": o.italics = true; break;
                        }
                        break;
                    }
                }
            }
        }
    }

    private ParseElement(cnt, e, p, styles?) {
        if (!styles) styles = [];
        if (e.getAttribute) {
            let nodeStyle = e.getAttribute("style");
            if (nodeStyle) {
                let ns = nodeStyle.split(";");
                for (let k = 0; k < ns.length; k++) styles.push(ns[k]);
            }
        }

        switch (e.nodeName.toLowerCase()) {
            case "#text": {
                let t = { text: e.textContent.replace(/\n/g, "") };
                if (styles) this.ComputeStyle(t, styles);
                p.text.push(t);
                break;
            }
            case "b": case "strong": {
                //styles.push("font-weight:bold");
                this.ParseContainer(cnt, e, p, styles.concat(["font-weight:bold"]));
                break;
            }
            case "u": {
                //styles.push("text-decoration:underline");
                this.ParseContainer(cnt, e, p, styles.concat(["text-decoration:underline"]));
                break;
            }
            case "i": {
                //styles.push("font-style:italic");
                this.ParseContainer(cnt, e, p, styles.concat(["font-style:italic"]));
                //styles.pop();
                break;
                //cnt.push({ text: e.innerText, bold: false });
            }
            case "span": {
                this.ParseContainer(cnt, e, p, styles);
                break;
            }
            case "br": {
                p = this.CreateParagraph();
                cnt.push(p);
                break;
            }
            case "table":
                {
                    let t = {
                        table: {
                            widths: [],
                            body: []
                        },
                        layout: null
                    }
                    let border = e.getAttribute("border");
                    let isBorder = false;
                    if (border) if (parseInt(border) == 1) isBorder = true;
                    if (!isBorder) t.layout = 'noBorders';
                    this.ParseContainer(t.table.body, e, p, styles);

                    let widths = e.getAttribute("widths");
                    if (!widths) {
                        if (t.table.body.length != 0) {
                            if (t.table.body[0].length != 0) for (let k = 0; k < t.table.body[0].length; k++) t.table.widths.push("*");
                        }
                    } else {
                        let w = widths.split(",");
                        for (let k = 0; k < w.length; k++) t.table.widths.push(w[k]);
                    }
                    cnt.push(t);
                    break;
                }
            case "tbody": {
                this.ParseContainer(cnt, e, p, styles);
                //p = CreateParagraph();
                break;
            }
            case "tr": {
                let row = [];
                this.ParseContainer(row, e, p, styles);
                cnt.push(row);
                break;
            }
            case "td": {
                p = this.CreateParagraph();
                let st = {
                    stack: [],
                    rowSpan: null,
                    colSpan: null
                }
                st.stack.push(p);

                let rspan = e.getAttribute("rowspan");
                if (rspan) st.rowSpan = parseInt(rspan);
                let cspan = e.getAttribute("colspan");
                if (cspan) st.colSpan = parseInt(cspan);

                this.ParseContainer(st.stack, e, p, styles);
                cnt.push(st);
                break;
            }
            case "div": case "p": {
                p = this.CreateParagraph();
                let st = { stack: [] }
                st.stack.push(p);
                this.ComputeStyle(st, styles);
                this.ParseContainer(st.stack, e, p);

                cnt.push(st);
                break;
            }
            default: {
                console.log("Parsing for node " + e.nodeName + " not found");
                break;
            }
        }
        return p;
    }

    public ParseHtml(cnt, htmlText) {
        let html = $(htmlText.replace(/\t/g, "").replace(/\n/g, ""));
        let p = this.CreateParagraph();
        for (let i = 0; i < html.length; i++) {
            this.ParseElement(cnt, html.get(i), p)
        };
    }

    private CreateParagraph() {
        let p = { text: [] };
        return p;
    }

}
