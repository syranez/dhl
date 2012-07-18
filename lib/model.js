/**
 * A model containing delivery state of a packet
 *
 */

/**
 * flag whether packet is delivered or not
 *
 * @var boolean
 */
this.delivered = false;

/**
 * official state of the packet from the delivery service.
 *
 * @var string
 */
this.state = "";

/**
 * steps that delivery service did till now.
 *
 * @var array
 */
this.steps = [];
