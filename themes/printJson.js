fs=require('fs');
var json = JSON.parse(fs.readFileSync("themes.txt"));
console.log('json.length:'+json.length);
for(i in json){
    // record = JSON.stringify(json[i]);
    theme = json[i];
    id = theme.id;
    name="";
    let lid;
    let lname;
    let lkey;
    let ltype;
    let lvalue;
    for(ix in theme.items){
        lid = theme.id;
        item = theme.items[ix];
        key=item.key;
        type=item.type;
        value=unescape(item.value);
        if (key=="name"){
            lname=value;
        } else {
            if (key=="created_at"){
                lkey = key;
                ltype = type;
                lvalue = value;
            }
        }
    }
    if (ltype=="string"){
        console.log('lid:'+lid+' lname:'+lname+' ltype:'+ltype+' lvalue:'+lvalue);
    }
    // if(record["created_at"]) 
    // record["name"]
    // record["title"]
    // record["abstract"]
    // record["docs"]
    // record["github"]
    // record["group"]
    // record["purpose"]
    // record["status"]
    // record["progress"]
    // record["memo"]
    // record["priority"]
    // record["dependencies"]
    // record["planed_start"]
    // record["actual_start"]
    // record["duration"]
    // record["planed_finish"]
    // record["actual_finish"]
    // record["created_at"]
    // record["updated_at"]
    }
