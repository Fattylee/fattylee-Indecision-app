'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var appRoot = document.querySelector('#app-root');

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

    _this.state = {
      options: props.options,
      error: undefined
    };
    _this.handleRemoveAll = _this.handleRemoveAll.bind(_this);
    _this.makeDecision = _this.makeDecision.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
    return _this;
  }

  _createClass(IndecisionApp, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      var text = e.target.elements.option.value.trim();

      if (!text) {
        this.setState(function (prevState) {
          return { error: 'can\'t add an empty option' };
        });
        e.target.elements.option.value = '';
        return;
      } else if (this.state.options.find(function (option) {
        return option.toLowerCase() === text.toLowerCase();
      })) {
        return this.setState(function (prevState) {
          return { error: 'option \'' + text + '\' already exist' };
        });
      }

      this.setState(function (prevState) {
        return {
          options: [].concat(_toConsumableArray(prevState.options), [text]),
          error: undefined
        };
      });

      e.target.elements.option.value = '';
    }
  }, {
    key: 'handleRemoveAll',
    value: function handleRemoveAll(e) {
      this.setState(function (prevState) {
        return { options: [], error: undefined };
      });
    }
  }, {
    key: 'makeDecision',
    value: function makeDecision() {
      var randomNum = Math.floor(Math.random() * this.state.options.length);
      if (this.state.options.length) {
        alert(this.state.options[randomNum]);
      }
    }
  }, {
    key: 'handleDeleteOption',
    value: function handleDeleteOption(optionToRemove) {
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (option) {
            return option !== optionToRemove;
          })
        };
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      try {
        var options = JSON.parse(localStorage.getItem('options'));
        if (options && options.length > 0) {
          this.setState(function (prevState) {
            return { options: options };
          });
        }
      } catch (e) {}
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount(prevProps, prevState) {
      console.log('componentWillUnmount');
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var jsonOptions = JSON.stringify(this.state.options);
      window.localStorage.setItem('options', jsonOptions);
    }
  }, {
    key: 'render',
    value: function render() {
      var subTitle = 'Put your life in the hands of a computer';

      return React.createElement(
        'div',
        null,
        React.createElement(Header, {
          subTitle: subTitle
        }),
        React.createElement(Action, {
          optionLength: this.state.options.length,
          makeDecision: this.makeDecision
        }),
        React.createElement(Options, {
          options: this.state.options,
          handleRemoveAll: this.handleRemoveAll,
          handleDeleteOption: this.handleDeleteOption
        }),
        React.createElement(AddOption, {
          handleSubmit: this.handleSubmit,
          error: this.state.error,
          options: this.state.options
        })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

;

IndecisionApp.defaultProps = {
  options: []
};

var Header = function Header(_ref) {
  var title = _ref.title,
      subTitle = _ref.subTitle;

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      title
    ),
    subTitle && React.createElement(
      'p',
      null,
      subTitle
    )
  );
};

Header.defaultProps = {
  title: 'Indecision App'
};

var Action = function Action(_ref2) {
  var optionLength = _ref2.optionLength,
      makeDecision = _ref2.makeDecision;

  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { disabled: optionLength === 0, onClick: makeDecision },
      'What should I do?'
    )
  );
};

var Options = function Options(_ref3) {
  var options = _ref3.options,
      handleRemoveAll = _ref3.handleRemoveAll,
      handleDeleteOption = _ref3.handleDeleteOption;

  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { disabled: options.length === 0, onClick: handleRemoveAll },
      'Remove all'
    ),
    React.createElement(
      'ol',
      null,
      options.map(function (option) {
        return React.createElement(Option, {
          key: option,
          optionText: option,
          handleDeleteOption: handleDeleteOption
        });
      })
    )
  );
};

var Option = function Option(_ref4) {
  var optionText = _ref4.optionText,
      handleDeleteOption = _ref4.handleDeleteOption;

  return React.createElement(
    'li',
    null,
    optionText,
    React.createElement(
      'button',
      { onClick: function onClick(e) {
          handleDeleteOption(optionText);
        } },
      'remove'
    )
  );
};

var AddOption = function AddOption(_ref5) {
  var error = _ref5.error,
      handleSubmit = _ref5.handleSubmit,
      options = _ref5.options;

  return React.createElement(
    'div',
    null,
    error && React.createElement(
      'p',
      null,
      error
    ),
    !options.length && React.createElement(
      'p',
      null,
      'Add an option to get started'
    ),
    React.createElement(
      'form',
      { onSubmit: handleSubmit },
      React.createElement('input', { text: 'text', name: 'option' }),
      React.createElement(
        'button',
        null,
        'Add options'
      )
    )
  );
};

ReactDOM.render(React.createElement(IndecisionApp /*options={['text one', 'text two']}*/, null), appRoot);
