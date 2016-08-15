
/* Animation data which attempt to manage composition */

 var globalData = {"root":
     {
       "content":"This is just a content....",
       "ref":"element reference",
       "animation":"typing",
       "childs":[
         {
           "content":"## This is just a content....",
           "ref":"element reference",
           "animation":"typing",
           "childs":null
         },
         {
           "content":"## This is just a content....",
           "ref":"element reference",
           "animation":"static",
           "childs":null
         }
       ]
     }
 }

 var animationTyping = {
   cc:0,
   max: 0,
   item:null,
   oldStr: '',
   init: function (item) {
     this.item = item;
     this.item.animation='typing1';
     this.oldStr = this.item.content;
     animationTyping.run();
   },

   run: function () {
     this.item.content = this.oldStr.substring(0, this.cc);
     if(this.cc==this.oldStr.length) {
       this.cc=0;
       this.item.animation='typing2';
     } else {
       setTimeout(function () {
         animationTyping.run();
       },50)
       this.cc++;
     }
   }
 }

var CompositionElement = React.createClass({
  rawMarkup: function() {
    // This is example of a tying iteraction function .
    // Which a state will tell which typing stage...
    var md = new Remarkable();
    var rawMarkup = md.render( this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    if(this.props.childs) {
        return (
          <div>
            <h2>
              <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </h2>
            <AnimationLayers data={this.props.childs} />
          </div>
        );
    } else {
        return (
          <div>
            <h2>
              <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </h2>
          </div>
        );
    }
  }
});

var AnimationLayers = React.createClass({
  render: function() {
    var animationNodes = this.props.data.map(function(nodeItem) {
      return (
        <CompositionElement childs={nodeItem.childs} anim={nodeItem.content} >
          {nodeItem.content}
        </CompositionElement>
      );
    });
    return (
      <div className="AnimationLayers">
        {animationNodes}
      </div>
    );
  }
});

var AnimationCanvas = React.createClass({

  data: null,

  loadTreeJSON: function() {
    this.data=globalData;
    this.setState({data: globalData.root.childs});
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadTreeJSON();
    setInterval(this.animateNext, this.props.pollInterval);
  },
  animateNext: function () {
    if(this.data.root.childs[0].animation) {
      if(this.data.root.childs[0].animation=='typing') {
        animationTyping.init(this.data.root.childs[0]);
      }
    }
    this.setState({data: this.data.root.childs});
  },
  render: function() {
    return (
      <div className="AnimationCanvas">
        <AnimationLayers data={this.state.data} />
      </div>
    );
  }
});

ReactDOM.render(
  <AnimationCanvas pollInterval={50} />,
  document.getElementById('content')
);
